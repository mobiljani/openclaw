import { describe, expect, it } from "vitest";
import {
  PERPLEXITY_BASE_URL,
  PERPLEXITY_DEFAULT_MODEL_ID,
  PERPLEXITY_MODEL_CATALOG,
  buildPerplexityModelDefinition,
} from "./perplexity-models.js";

describe("perplexity-models", () => {
  it("exports correct base URL", () => {
    expect(PERPLEXITY_BASE_URL).toBe("https://api.perplexity.ai");
  });

  it("exports correct default model ID", () => {
    expect(PERPLEXITY_DEFAULT_MODEL_ID).toBe("sonar-pro");
  });

  it("has four models in the catalog", () => {
    expect(PERPLEXITY_MODEL_CATALOG).toHaveLength(4);
  });

  it("includes all Sonar models", () => {
    const ids = PERPLEXITY_MODEL_CATALOG.map((m) => m.id);
    expect(ids).toEqual(["sonar", "sonar-pro", "sonar-reasoning-pro", "sonar-deep-research"]);
  });

  it("marks sonar-reasoning-pro and sonar-deep-research as reasoning", () => {
    const reasoningPro = PERPLEXITY_MODEL_CATALOG.find((m) => m.id === "sonar-reasoning-pro");
    const deepResearch = PERPLEXITY_MODEL_CATALOG.find((m) => m.id === "sonar-deep-research");
    expect(reasoningPro?.reasoning).toBe(true);
    expect(deepResearch?.reasoning).toBe(true);
  });

  it("marks sonar and sonar-pro as non-reasoning", () => {
    const sonar = PERPLEXITY_MODEL_CATALOG.find((m) => m.id === "sonar");
    const sonarPro = PERPLEXITY_MODEL_CATALOG.find((m) => m.id === "sonar-pro");
    expect(sonar?.reasoning).toBe(false);
    expect(sonarPro?.reasoning).toBe(false);
  });

  it("all models are text-only", () => {
    for (const model of PERPLEXITY_MODEL_CATALOG) {
      expect(model.input).toEqual(["text"]);
    }
  });

  it("buildPerplexityModelDefinition returns a copy of the model", () => {
    const original = PERPLEXITY_MODEL_CATALOG[0];
    const built = buildPerplexityModelDefinition(original);
    expect(built).toEqual(original);
    expect(built).not.toBe(original);
  });
});
