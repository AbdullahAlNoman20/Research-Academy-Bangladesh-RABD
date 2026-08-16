// FILE: src/utils/leukemiaClassifier.js  (full rewrite — adds per-parameter status + explanation reasons for on-screen table)
export const NORMAL_RANGES = Object.freeze({
  hemoglobin: { M: [13, 17], F: [12, 16], unit: 'g/dL' },
  wbc: { range: [4, 11], unit: 'x10^3/uL' },
  platelet: { range: [150, 450], unit: 'x10^3/uL' },
  neutrophils: { child: [25, 66], adult: [40, 70], unit: '%' },
  lymphocytes: { child: [25, 62], adult: [20, 40], unit: '%' }
});

export function isChildAge(age) {
  return Number(age) < 18;
}

export function getReferenceRanges(age, sex) {
  const child = isChildAge(age);
  return {
    hemoglobin: NORMAL_RANGES.hemoglobin[sex] || NORMAL_RANGES.hemoglobin.F,
    wbc: NORMAL_RANGES.wbc.range,
    platelet: NORMAL_RANGES.platelet.range,
    neutrophils: child ? NORMAL_RANGES.neutrophils.child : NORMAL_RANGES.neutrophils.adult,
    lymphocytes: child ? NORMAL_RANGES.lymphocytes.child : NORMAL_RANGES.lymphocytes.adult,
    child
  };
}

function below(value, [min]) { return value < min; }
function above(value, [, max]) { return value > max; }
function within(value, [min, max]) { return value >= min && value <= max; }

function statusOf(value, range, direction) {
  if (within(value, range)) return 'Normal';
  if (direction === 'low' && below(value, range)) return 'Low';
  if (direction === 'high' && above(value, range)) return 'High';
  if (below(value, range)) return 'Low';
  if (above(value, range)) return 'High';
  return 'Normal';
}

export function classifyCbc(input) {
  const age = Number(input.age);
  const hb = Number(input.hemoglobin);
  const wbc = Number(input.wbc);
  const platelet = Number(input.platelet);
  const neutrophils = Number(input.neutrophils);
  const lymphocytes = Number(input.lymphocytes);
  const blastPresent = input.blast === 'present';
  const sex = input.sex === 'M' ? 'M' : 'F';

  const ranges = getReferenceRanges(age, sex);

  const flags = {
    hbLow: below(hb, ranges.hemoglobin),
    hbNormal: within(hb, ranges.hemoglobin),
    wbcHigh: above(wbc, ranges.wbc),
    wbcLow: below(wbc, ranges.wbc),
    wbcNormal: within(wbc, ranges.wbc),
    plateletLow: below(platelet, ranges.platelet),
    plateletNormal: within(platelet, ranges.platelet),
    neutrophilsLow: below(neutrophils, ranges.neutrophils),
    neutrophilsNormal: within(neutrophils, ranges.neutrophils),
    lymphocytesHigh: above(lymphocytes, ranges.lymphocytes),
    lymphocytesNormal: within(lymphocytes, ranges.lymphocytes),
    blastPresent
  };

  let riskClass = 'indeterminate';
  let reasons = [];

  if (
    flags.hbNormal && flags.wbcNormal && flags.plateletNormal &&
    flags.neutrophilsNormal && flags.lymphocytesNormal && !flags.blastPresent
  ) {
    riskClass = 'normal';
    reasons = ['All submitted parameters fall within normal reference ranges.', 'No atypical cells or blasts were detected.'];
  } else if (
    flags.hbLow && flags.wbcHigh && flags.plateletLow &&
    flags.neutrophilsLow && flags.lymphocytesHigh && flags.blastPresent
  ) {
    riskClass = 'A';
    reasons = [
      'Hemoglobin is below the normal range.',
      'Total WBC count is above the normal range.',
      'Platelet count is below the normal range.',
      'Neutrophils are below the normal range.',
      'Lymphocytes are above the normal range.',
      'Atypical cells or blasts were detected as present.'
    ];
  } else if (
    flags.hbLow && flags.wbcLow && flags.plateletLow &&
    flags.neutrophilsLow && flags.lymphocytesHigh
  ) {
    riskClass = 'B';
    reasons = [
      'Hemoglobin is below the normal range.',
      'Total WBC count is below the normal range.',
      'Platelet count is below the normal range.',
      'Neutrophils are below the normal range.',
      'Lymphocytes are above the normal range.'
    ];
  } else if (
    flags.hbNormal && flags.wbcNormal && flags.plateletLow &&
    flags.neutrophilsLow && flags.lymphocytesHigh
  ) {
    riskClass = 'C';
    reasons = [
      'Hemoglobin and total WBC count are within normal range.',
      'Platelet count is below the normal range.',
      'Neutrophils are below the normal range.',
      'Lymphocytes are above the normal range.'
    ];
  } else {
    reasons = ['The combination of submitted values does not clearly match a single defined screening pattern.'];
  }

  const table = [
    { parameter: 'Hemoglobin', value: `${hb} g/dL`, normalRange: `${ranges.hemoglobin[0]}–${ranges.hemoglobin[1]} g/dL`, status: statusOf(hb, ranges.hemoglobin, 'low') },
    { parameter: 'Total WBC Count', value: `${wbc} x10^3/uL`, normalRange: `${ranges.wbc[0]}–${ranges.wbc[1]} x10^3/uL`, status: statusOf(wbc, ranges.wbc, 'high') },
    { parameter: 'Total Platelet Count', value: `${platelet} x10^3/uL`, normalRange: `${ranges.platelet[0]}–${ranges.platelet[1]} x10^3/uL`, status: statusOf(platelet, ranges.platelet, 'low') },
    { parameter: 'Neutrophils', value: `${neutrophils}%`, normalRange: `${ranges.neutrophils[0]}–${ranges.neutrophils[1]}%`, status: statusOf(neutrophils, ranges.neutrophils, 'low') },
    { parameter: 'Lymphocytes', value: `${lymphocytes}%`, normalRange: `${ranges.lymphocytes[0]}–${ranges.lymphocytes[1]}%`, status: statusOf(lymphocytes, ranges.lymphocytes, 'high') },
    { parameter: 'Atypical Cell / Blast', value: blastPresent ? 'Present' : 'Absent', normalRange: 'Absent', status: blastPresent ? 'Present' : 'Normal' }
  ];

  return { riskClass, flags, ranges, reasons, table, values: { age, sex, hb, wbc, platelet, neutrophils, lymphocytes, blastPresent } };
}

export const RESULT_META = Object.freeze({
  normal: { label: 'Normal', riskLevel: 'Normal', color: '#0F2A52' },
  A: { label: 'Class A', riskLevel: 'High', color: '#DC2626' },
  B: { label: 'Class B', riskLevel: 'Moderate', color: '#D98F1F' },
  C: { label: 'Class C', riskLevel: 'Low', color: '#F2A93B' },
  indeterminate: { label: 'Indeterminate', riskLevel: 'Needs Review', color: '#6B7280' }
});