import { ProbabilityResults } from "../math/probabilityCalculations";

type ProbabilityResultsDisplayProps = {
  successes: number | null;
  probabilities: ProbabilityResults | null;
};

const ResultsDisplay = (props: ProbabilityResultsDisplayProps) => {
  const { successes, probabilities } = props;

  const renderProbability = (label: string, value: number | undefined) => (
    <h2>
      {label} {successes ? successes : "n/a"} successes:{" "}
      {value ? `${(value * 100).toFixed(10)}%` : "n/a"}
    </h2>
  );

  return (
    <div>
      <h2>Probability of:</h2>
      {renderProbability("exactly", probabilities?.exactlyXProbability)}
      {renderProbability("at least", probabilities?.atLeastXProbability)}
      {renderProbability("less than", probabilities?.lessThanXProbability)}
      {renderProbability("more than", probabilities?.moreThanXProbability)}
    </div>
  );
};

export default ResultsDisplay;
