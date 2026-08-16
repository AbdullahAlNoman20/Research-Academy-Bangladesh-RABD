// FILE: src/Pages/LeukoScanner.jsx  (full rewrite — no step pipeline props/state, keeps simple back/forward flow)
import { useState } from 'react';
import SEO from '../Components/Shared/SEO';
import RotatingHero from '../Components/leukoscanner/RotatingHero';
import CbcForm from '../Components/leukoscanner/CbcForm';
import ResultView from '../Components/leukoscanner/ResultView';
import { classifyCbc } from '../utils/leukemiaClassifier';

export default function LeukoScanner() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formValues, setFormValues] = useState(null);
  const [classification, setClassification] = useState(null);

  function goTo(index) {
    setStepIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSubmit(values) {
    const result = classifyCbc(values);
    setFormValues(values);
    setClassification(result);
    goTo(2);
  }

  function handleRestart() {
    setFormValues(null);
    setClassification(null);
    goTo(0);
  }

  return (
    <>
      <SEO
        title="LeukoScanner — CBC-Based Leukemia Detection"
        description="An automated CBC-based screening tool for leukemia risk classification, developed by Research Academy Bangladesh."
        path="/our-work/leukoscanner"
      />

      {stepIndex === 0 && <RotatingHero onEnterReport={() => goTo(1)} />}
      {stepIndex === 1 && <CbcForm initialValues={formValues} onSubmit={handleSubmit} onBack={() => goTo(0)} />}
      {stepIndex === 2 && classification && (
        <ResultView classification={classification} onRestart={handleRestart} onBack={() => goTo(1)} />
      )}
    </>
  );
}