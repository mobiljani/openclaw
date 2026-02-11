import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { resolveImplicitProviders } from "./models-config.providers.js";

describe("Perplexity provider", () => {
  it("should include perplexity when PERPLEXITY_API_KEY is configured", async () => {
    const agentDir = mkdtempSync(join(tmpdir(), "openclaw-test-"));
    const previous = process.env.PERPLEXITY_API_KEY;
    process.env.PERPLEXITY_API_KEY = "pplx-test-key";

    try {
      const providers = await resolveImplicitProviders({ agentDir });
      expect(providers?.perplexity).toBeDefined();
      expect(providers?.perplexity?.apiKey).toBe("PERPLEXITY_API_KEY");
      expect(providers?.perplexity?.baseUrl).toBe("https://api.perplexity.ai");
      expect(providers?.perplexity?.api).toBe("openai-completions");
      expect(providers?.perplexity?.models?.length).toBeGreaterThanOrEqual(3);
    } finally {
      if (previous === undefined) {
        delete process.env.PERPLEXITY_API_KEY;
      } else {
        process.env.PERPLEXITY_API_KEY = previous;
      }
    }
  });

  it("should not include perplexity when PERPLEXITY_API_KEY is not set", async () => {
    const agentDir = mkdtempSync(join(tmpdir(), "openclaw-test-"));
    const previous = process.env.PERPLEXITY_API_KEY;
    delete process.env.PERPLEXITY_API_KEY;

    try {
      const providers = await resolveImplicitProviders({ agentDir });
      expect(providers?.perplexity).toBeUndefined();
    } finally {
      if (previous !== undefined) {
        process.env.PERPLEXITY_API_KEY = previous;
      }
    }
  });
});
