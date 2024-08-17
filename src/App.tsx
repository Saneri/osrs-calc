import { useState } from "react";
import "./App.css";
import DropProbabilityForm, { FormValues } from "./forms/DropProbabilityForm";
import {
  calculateProbabilities,
  ProbabilityResults,
} from "./math/probabilityCalculations";
import ResultsDisplay from "./components/ResultDisplay";

function App() {
  const [successes, setSuccesses] = useState<number | null>(null);
  const [probabilities, setProbabilities] = useState<ProbabilityResults | null>(
    null
  );

  const onSubmit = (values: FormValues) => {
    const dropChance =
      values.successProbabilityNumerator / values.successProbabilityDenominator;
    setProbabilities(
      calculateProbabilities(values.trials, values.successes, dropChance)
    );
    setSuccesses(values.successes);
  };

  return (
    <>
      <h1>OSRS Drop Probability Calculator</h1>
      <DropProbabilityForm onSubmit={onSubmit} />
      <ResultsDisplay successes={successes} probabilities={probabilities} />
    </>
  );
}

export default App;
