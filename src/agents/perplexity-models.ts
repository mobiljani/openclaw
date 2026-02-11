import type { ModelDefinitionConfig } from "../config/types.models.js";

export const PERPLEXITY_BASE_URL = "https://api.perplexity.ai";
export const PERPLEXITY_DEFAULT_MODEL_ID = "sonar-pro";

// Perplexity pricing (per million tokens, USD)
// https://docs.perplexity.ai/guides/pricing
const PERPLEXITY_SONAR_COST = {
  input: 1,
  output: 1,
  cacheRead: 1,
  cacheWrite: 1,
};

const PERPLEXITY_SONAR_PRO_COST = {
  input: 3,
  output: 15,
  cacheRead: 3,
  cacheWrite: 3,
};

const PERPLEXITY_SONAR_REASONING_PRO_COST = {
  input: 2,
  output: 8,
  cacheRead: 2,
  cacheWrite: 2,
};

// Deep Research also has citation ($2/M) and reasoning ($5/M) token costs
// that aren't captured in the standard cost model.
const PERPLEXITY_SONAR_DEEP_RESEARCH_COST = {
  input: 2,
  output: 8,
  cacheRead: 2,
  cacheWrite: 2,
};

export const PERPLEXITY_MODEL_CATALOG: ModelDefinitionConfig[] = [
  {
    id: "sonar",
    name: "Perplexity Sonar",
    reasoning: false,
    input: ["text"],
    contextWindow: 127072,
    maxTokens: 8192,
    cost: PERPLEXITY_SONAR_COST,
  },
  {
    id: "sonar-pro",
    name: "Perplexity Sonar Pro",
    reasoning: false,
    input: ["text"],
    contextWindow: 127072,
    maxTokens: 8192,
    cost: PERPLEXITY_SONAR_PRO_COST,
  },
  {
    id: "sonar-reasoning-pro",
    name: "Perplexity Sonar Reasoning Pro",
    reasoning: true,
    input: ["text"],
    contextWindow: 127072,
    maxTokens: 8192,
    cost: PERPLEXITY_SONAR_REASONING_PRO_COST,
  },
  {
    id: "sonar-deep-research",
    name: "Perplexity Sonar Deep Research",
    reasoning: true,
    input: ["text"],
    contextWindow: 127072,
    maxTokens: 8192,
    cost: PERPLEXITY_SONAR_DEEP_RESEARCH_COST,
  },
];

export function buildPerplexityModelDefinition(
  model: ModelDefinitionConfig,
): ModelDefinitionConfig {
  return { ...model };
}
