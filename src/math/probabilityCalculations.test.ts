import { describe, it, expect } from "vitest";
import {
  probabilityMassFunction,
  probabilityToGetAtLeastX,
} from "./probabilityCalculations";

describe("probabilityMassFunction", () => {
  it("should return 0 if k > n", () => {
    expect(probabilityMassFunction(5, 3, 0.5)).toBe(0);
  });

  it("should return 0 if p <= 0", () => {
    expect(probabilityMassFunction(3, 5, 0)).toBe(0);
    expect(probabilityMassFunction(3, 5, -0.1)).toBe(0);
  });

  it("should return the correct probability for valid inputs", () => {
    expect(probabilityMassFunction(2, 5, 0.5)).toBeCloseTo(0.3125, 5);
    expect(probabilityMassFunction(3, 5, 0.5)).toBeCloseTo(0.3125, 5);
    expect(probabilityMassFunction(0, 5, 0.5)).toBeCloseTo(0.03125, 5);
  });

  it("should handle edge cases correctly", () => {
    expect(probabilityMassFunction(0, 0, 0.5)).toBe(1);
    expect(probabilityMassFunction(0, 1, 0.5)).toBeCloseTo(0.5, 5);
    expect(probabilityMassFunction(1, 1, 0.5)).toBeCloseTo(0.5, 5);
  });
});

describe("probabilityToGetAtLeastX", () => {
  it("should return 0 if the total probability is negative", () => {
    expect(probabilityToGetAtLeastX([1.1, 0.1, 0.1])).toBe(0);
  });

  it("should return the correct probability for valid inputs", () => {
    expect(probabilityToGetAtLeastX([0.1, 0.2, 0.3])).toBeCloseTo(0.7, 5);
    expect(probabilityToGetAtLeastX([0.25, 0.25, 0.25])).toBeCloseTo(0.5, 5);
  });

  it("should handle edge cases correctly", () => {
    expect(probabilityToGetAtLeastX([0])).toBe(1);
    expect(probabilityToGetAtLeastX([1])).toBe(1);
    expect(probabilityToGetAtLeastX([0.5, 0.5])).toBeCloseTo(0.5, 5);
  });

  it("should handle an empty array", () => {
    expect(probabilityToGetAtLeastX([])).toBe(1);
  });

  it("should handle an array with one element", () => {
    expect(probabilityToGetAtLeastX([0.5])).toBe(1);
  });
});
