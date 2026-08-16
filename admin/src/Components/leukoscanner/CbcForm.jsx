// FILE: src/Components/leukoscanner/CbcForm.jsx  (full rewrite — pipeline above Back button)
import { useState } from 'react';
import Button from '../Shared/Button';

const INITIAL = { age: '', sex: '', hemoglobin: '', wbc: '', platelet: '', neutrophils: '', lymphocytes: '', blast: '' };

function isNumberInRange(value, min, max) {
  const n = Number(value);
  return value !== '' && !Number.isNaN(n) && n >= min && n <= max;
}

export default function CbcForm({ initialValues, onSubmit, onBack }) {
  const [form, setForm] = useState(initialValues || INITIAL);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const errs = {};
    if (!isNumberInRange(form.age, 0, 120)) errs.age = 'Enter a valid age (0–120)';
    if (form.sex !== 'M' && form.sex !== 'F') errs.sex = 'Select sex';
    if (!isNumberInRange(form.hemoglobin, 0, 25)) errs.hemoglobin = 'Enter a valid hemoglobin value (g/dL)';
    if (!isNumberInRange(form.wbc, 0, 100)) errs.wbc = 'Enter a valid WBC count (x10^3/uL)';
    if (!isNumberInRange(form.platelet, 0, 2000)) errs.platelet = 'Enter a valid platelet count (x10^3/uL)';
    if (!isNumberInRange(form.neutrophils, 0, 100)) errs.neutrophils = 'Enter a valid neutrophils % (0–100)';
    if (!isNumberInRange(form.lymphocytes, 0, 100)) errs.lymphocytes = 'Enter a valid lymphocytes % (0–100)';
    if (form.blast !== 'present' && form.blast !== 'absent') errs.blast = 'Select atypical cell/blast status';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(form);
  }

  const FIELD_CLASS = 'w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none';

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 lg:px-8">
      <button type="button" onClick={onBack} className="hover-underline-gold mb-6 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary">
        ← Back
      </button>
      <h2 className="mb-2 text-2xl font-bold text-primary">Enter Your CBC Report</h2>
      <p className="mb-8 text-sm text-neutral-700">
        This screening tool is for informational purposes only and does not replace a professional medical diagnosis.
      </p>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="mb-1 block text-sm font-semibold text-primary">Age</label>
            <input id="age" name="age" type="number" min="0" max="120" value={form.age} onChange={handleChange} className={FIELD_CLASS} />
            {errors.age && <p role="alert" className="mt-1 text-xs text-red-600">{errors.age}</p>}
          </div>
          <div>
            <label htmlFor="sex" className="mb-1 block text-sm font-semibold text-primary">Sex</label>
            <select id="sex" name="sex" value={form.sex} onChange={handleChange} className={FIELD_CLASS}>
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {errors.sex && <p role="alert" className="mt-1 text-xs text-red-600">{errors.sex}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="hemoglobin" className="mb-1 block text-sm font-semibold text-primary">Hemoglobin (g/dL) <span className="text-xs font-normal text-neutral-700">Normal: M 13–17, F 12–16</span></label>
          <input id="hemoglobin" name="hemoglobin" type="number" step="0.1" min="0" max="25" value={form.hemoglobin} onChange={handleChange} className={FIELD_CLASS} />
          {errors.hemoglobin && <p role="alert" className="mt-1 text-xs text-red-600">{errors.hemoglobin}</p>}
        </div>

        <div>
          <label htmlFor="wbc" className="mb-1 block text-sm font-semibold text-primary">Total WBC Count (x10^3/uL) <span className="text-xs font-normal text-neutral-700">Normal: 4–11</span></label>
          <input id="wbc" name="wbc" type="number" step="0.1" min="0" max="100" value={form.wbc} onChange={handleChange} className={FIELD_CLASS} />
          {errors.wbc && <p role="alert" className="mt-1 text-xs text-red-600">{errors.wbc}</p>}
        </div>

        <div>
          <label htmlFor="platelet" className="mb-1 block text-sm font-semibold text-primary">Total Platelet Count (x10^3/uL) <span className="text-xs font-normal text-neutral-700">Normal: 150–450</span></label>
          <input id="platelet" name="platelet" type="number" step="1" min="0" max="2000" value={form.platelet} onChange={handleChange} className={FIELD_CLASS} />
          {errors.platelet && <p role="alert" className="mt-1 text-xs text-red-600">{errors.platelet}</p>}
        </div>

        <div>
          <label htmlFor="neutrophils" className="mb-1 block text-sm font-semibold text-primary">Neutrophils (%) <span className="text-xs font-normal text-neutral-700">Normal: Child 25–66%, Adult 40–70%</span></label>
          <input id="neutrophils" name="neutrophils" type="number" step="0.1" min="0" max="100" value={form.neutrophils} onChange={handleChange} className={FIELD_CLASS} />
          {errors.neutrophils && <p role="alert" className="mt-1 text-xs text-red-600">{errors.neutrophils}</p>}
        </div>

        <div>
          <label htmlFor="lymphocytes" className="mb-1 block text-sm font-semibold text-primary">Lymphocytes (%) <span className="text-xs font-normal text-neutral-700">Normal: Child 25–62%, Adult 20–40%</span></label>
          <input id="lymphocytes" name="lymphocytes" type="number" step="0.1" min="0" max="100" value={form.lymphocytes} onChange={handleChange} className={FIELD_CLASS} />
          {errors.lymphocytes && <p role="alert" className="mt-1 text-xs text-red-600">{errors.lymphocytes}</p>}
        </div>

        <div>
          <label htmlFor="blast" className="mb-1 block text-sm font-semibold text-primary">Atypical Cell / Blast</label>
          <select id="blast" name="blast" value={form.blast} onChange={handleChange} className={FIELD_CLASS}>
            <option value="">Select</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          {errors.blast && <p role="alert" className="mt-1 text-xs text-red-600">{errors.blast}</p>}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}