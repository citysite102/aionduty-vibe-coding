export type Reference = {
  id: string;
  title: string;
  url: string;
  source: string;
};

export const references: Record<string, Reference> = {
  slash_sdk: {
    id: "slash_sdk",
    title: "Slash 指令 (SDK)",
    url: "https://code.claude.com/docs/en/agent-sdk/slash-commands",
    source: "Anthropic",
  },
  agent_teams: {
    id: "agent_teams",
    title: "Agent Teams",
    url: "https://code.claude.com/docs/en/agent-teams",
    source: "Anthropic",
  },
  workflows: {
    id: "workflows",
    title: "Dynamic Workflows",
    url: "https://code.claude.com/docs/en/workflows",
    source: "Anthropic",
  },
  loop_eng: {
    id: "loop_eng",
    title: "Loop Engineering",
    url: "https://addyosmani.com/blog/loop-engineering/",
    source: "Addy Osmani",
  },
  codex_changelog: {
    id: "codex_changelog",
    title: "Codex Changelog",
    url: "https://developers.openai.com/codex/changelog",
    source: "OpenAI",
  },
  perm_modes: {
    id: "perm_modes",
    title: "Permission Modes",
    url: "https://code.claude.com/docs/en/permission-modes",
    source: "Anthropic",
  },
  sandbox: {
    id: "sandbox",
    title: "Sandbox Environments",
    url: "https://code.claude.com/docs/en/sandbox-environments",
    source: "Anthropic",
  },
  codex_best_prac: {
    id: "codex_best_prac",
    title: "Codex Best Practices",
    url: "https://developers.openai.com/codex/learn/best-practices",
    source: "OpenAI",
  },
  skills_exp: {
    id: "skills_exp",
    title: "Skills Explained",
    url: "https://claude.com/blog/skills-explained",
    source: "Anthropic",
  },
  building_agents: {
    id: "building_agents",
    title: "Building Effective Agents",
    url: "https://www.anthropic.com/research/building-effective-agents",
    source: "Anthropic",
  },
};
