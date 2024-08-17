import { combinations } from "mathjs";

export type ProbabilityResults = {
  exactlyXProbability: number;
  atLeastXProbability: number;
  lessThanXProbability: number;
  moreThanXProbability: number;
};

/**
 * Calculates the probabilities of getting exactly k successes and at least k successes.
 *
 * @param numTrials - The number of trials.
 * @param numSuccesses - The number of successes.
 * @param successProbability - The chance of success per trial.
 */
export function calculateProbabilities(
  numTrials: number,
  numSuccesses: number,
  successProbability: number
): ProbabilityResults {
  const probabilitiesArray: number[] = new Array(numSuccesses + 1).fill(0);

  for (let i = 0; i <= numSuccesses; i++) {
    probabilitiesArray[i] = probabilityMassFunction(
      i,
      numTrials,
      successProbability
    );
  }

  let probToGetAtLeastX: number;
  if (numSuccesses >= numTrials) {
    probToGetAtLeastX = probabilitiesArray[numSuccesses];
  } else {
    probToGetAtLeastX = probabilityToGetAtLeastX(probabilitiesArray);
  }
  const exactlyXProbability = probabilitiesArray[numSuccesses];
  const atLeastXProbability = probToGetAtLeastX;
  const lessThanXProbability = 1 - probToGetAtLeastX;
  const moreThanXProbability =
    probToGetAtLeastX - probabilitiesArray[numSuccesses];

  let exactlyXFraction = "";
  let atLeastXFraction = "";

  if (probabilitiesArray[numSuccesses] <= 0) {
    exactlyXFraction = "exactly zero.";
  } else {
    exactlyXFraction = `roughly 1 / ${Math.round(
      1 / probabilitiesArray[numSuccesses]
    ).toLocaleString()}`;
  }

  if (probToGetAtLeastX <= 0) {
    atLeastXFraction = "exactly zero.";
  } else {
    atLeastXFraction = `roughly 1 / ${Math.round(
      1 / probToGetAtLeastX
    ).toLocaleString()}`;
  }

  console.log(
    `With the chance of success at ${successProbability} per trial\n` +
      `taking a set of ${numTrials} trials,\n there is a:\n`
  );

  console.log(
    `    chance to get EXACTLY ${numSuccesses} successes: ${(
      100 * probabilitiesArray[numSuccesses]
    ).toFixed(20)} %` + `      or ${exactlyXFraction}`
  );
  console.log(
    `    chance to get AT LEAST ${numSuccesses} successes: ${(
      100 * probToGetAtLeastX
    ).toFixed(20)} %` + `      or ${atLeastXFraction}`
  );
  console.log("\n         Alternatively:");
  console.log(
    `    chance to get LESS THAN ${numSuccesses} successes: ${(
      100 -
      100 * probToGetAtLeastX
    ).toFixed(20)} %`
  );
  console.log(
    `    chance to get MORE THAN ${numSuccesses} successes: ${(
      100 *
      (probToGetAtLeastX - probabilitiesArray[numSuccesses])
    ).toFixed(20)} %`
  );

  return {
    exactlyXProbability,
    atLeastXProbability,
    lessThanXProbability,
    moreThanXProbability,
  };
}

/**
 * Calculates the probability mass function (PMF) for a given number of successes in a series of trials.
 *
 * @param successes - The number of successful outcomes.
 * @param trials - The total number of trials.
 * @param successProbability - The probability of success in each trial.
 * @returns The probability mass function (PMF) value.
 */
export function probabilityMassFunction(
  successes: number,
  trials: number,
  successProbability: number
): number {
  if (successes > trials || successProbability <= 0) {
    return 0;
  }
  const result =
    Number(combinations(trials, successes)) *
    Math.pow(successProbability, successes) *
    Math.pow(1 - successProbability, trials - successes);
  return result < 0 ? 0 : result;
}

/**
 * Calculates the probability of getting at least X from an array of probabilities.
 *
 * @param probs - An array of probabilities.
 * @returns The probability of getting at least X.
 */
export function probabilityToGetAtLeastX(probs: number[]): number {
  let total = 0;
  for (let i = 0; i < probs.length - 1; i++) {
    total += probs[i];
  }
  total = 1 - total;
  if (total < 0) {
    return 0;
  }
  return total;
}
