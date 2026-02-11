---
summary: "Perplexity model provider setup (auth + model selection)"
read_when:
  - You want to use Perplexity as a model provider with OpenClaw
  - You need the PERPLEXITY_API_KEY env var or CLI auth choice for model inference
title: "Perplexity"
---

# Perplexity

[Perplexity](https://www.perplexity.ai) provides AI models with built-in web search
capabilities. The Sonar model family offers fast Q&A, multi-step reasoning, and
chain-of-thought with grounded web citations.

- Provider: `perplexity`
- Auth: `PERPLEXITY_API_KEY`
- API: OpenAI-compatible

## Quick start

1. Store the API key for the Gateway:

```bash
openclaw onboard --auth-choice perplexity-api-key
```

2. Set a default model:

```json5
{
  agents: {
    defaults: {
      model: { primary: "perplexity/sonar-pro" },
    },
  },
}
```

## Non-interactive example

```bash
openclaw onboard --non-interactive \
  --mode local \
  --auth-choice perplexity-api-key \
  --perplexity-api-key "$PERPLEXITY_API_KEY"
```

This will set `perplexity/sonar-pro` as the default model.

## Environment note

If the Gateway runs as a daemon (launchd/systemd), make sure `PERPLEXITY_API_KEY`
is available to that process (for example, in `~/.clawdbot/.env` or via
`env.shellEnv`).

## Available models

| Model               | ID                    | Use case                                       |
| ------------------- | --------------------- | ---------------------------------------------- |
| Sonar               | `sonar`               | Fast Q&A with web search                       |
| Sonar Pro           | `sonar-pro`           | Multi-step reasoning with web search (default) |
| Sonar Reasoning Pro | `sonar-reasoning-pro` | Chain-of-thought deep research                 |
| Sonar Deep Research | `sonar-deep-research` | Exhaustive multi-step research reports         |

All models are text-only and have a 127K context window.

## Limitations

- Perplexity models do **not** support tool calling. Use as a conversation or
  reasoning model only; tools will be unavailable when using a Perplexity model.
- No image/vision input support.

## Perplexity as web search tool

Perplexity can also power the `web_search` tool (separate from the model provider).
See [Perplexity Sonar for web search](/perplexity) for that configuration.
