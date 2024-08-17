import { useState } from "react";
import "./App.css";
import DropProbabilityForm, { FormValues } from "./forms/DropProbabilityForm";
import {
  calculateProbabilities,
  ProbabilityResults,
} from "./math/probabilityCalculations";

function App() {
  const [trials, setTrials] = useState<number | null>(null);
  const [probabilities, setProbabilities] = useState<ProbabilityResults | null>(
    null
  );

  const onSubmit = (values: FormValues) => {
    setTrials(values.trials);
    setProbabilities(
      calculateProbabilities(
        values.trials,
        values.successes,
        values.successProbability
      )
    );
  };

  return (
    <>
      <h1>OSRS Drop Probability Calculator</h1>
      <DropProbabilityForm onSubmit={onSubmit} />
      {probabilities && (
        <div>
          <h2>Probability of:</h2>
          <h2>
            exactly {trials !== null ? trials : "n/a"} successes:{" "}
            {probabilities.exactlyXProbability !== null
              ? `${(probabilities.exactlyXProbability * 100).toFixed(2)}%`
              : "n/a"}
          </h2>
          <h2>
            at least {trials !== null ? trials : "n/a"} successes:{" "}
            {probabilities.atLeastXProbability !== null
              ? `${(probabilities.atLeastXProbability * 100).toFixed(2)}%`
              : "n/a"}
          </h2>
          <h2>
            less than {trials !== null ? trials : "n/a"} successes:{" "}
            {probabilities.lessThanXProbability !== null
              ? `${(probabilities.lessThanXProbability * 100).toFixed(2)}%`
              : "n/a"}
          </h2>
          <h2>
            more than {trials !== null ? trials : "n/a"} successes:{" "}
            {probabilities.moreThanXProbability !== null
              ? `${(probabilities.moreThanXProbability * 100).toFixed(2)}%`
              : "n/a"}
          </h2>
        </div>
      )}
    </>
  );
}

export default App;
