export const projects: {
  [project: string]: {
    color?: number;
    abbreviations?: string;
    allow_builds?: string[];
    file_type?: string;
  };
} = {
  "custom-git-messages": {
    color: 1,
    abbreviations: "cm",
  },
  "skyblock-pv": {
    color: 0xf6b8d0,
    abbreviations: "pv",
    allow_builds: ["master"],
  },
  "skyblock-pv-backend": {
    color: 0xfc5203,
    abbreviations: "pv-backend",
  },
  skycubed: {
    color: 0xd1feb8,
    abbreviations: "sc",
    allow_builds: ["master"],
  },
  customscoreboard: {
    color: 0xf1beb5,
    abbreviations: "cs",
    allow_builds: ["main"],
  },
  skyocean: {
    color: 0xa4d8d8,
    abbreviations: "so",
    allow_builds: ["main"],
  },
  "skyblock-rpc": {
    color: 0xf8c57c,
    abbreviations: "rpc",
    allow_builds: ["master"],
  },
  skyblockapi: {
    color: 0xffffff,
    abbreviations: "api",
  },
  "meowdding-lib": {
    color: 0x957dad,
    abbreviations: "mlib",
  },
  ktmodules: {},
  "meowdding-repo": {
    abbreviations: "repo",
  },
  ktcodecs: {},
  "sky-block": {
    color: 0xf9a7ff,
  },
  bot: {},
  "meowdding-patches": {
    abbreviations: "patches",
  },
  website: {},
  "remote-configs": {},
  rewardclaim: {
    abbreviations: "rc",
    allow_builds: ["master"],
  },
  repo: {
    abbreviations: "sbapi-repo",
  },
  "repo-lib": {},
  "meowdding-dev-utils": {
    abbreviations: "dev-utils",
  },
  "item-data-fixer": {
    abbreviations: "dfu",
  },
  "meowdding-gradle": {},
  sillygames: {
    abbreviations: "games",
  },
  "cosmetics-backend": {},
  catharsis: {
    color: 0xd21f64,
    allow_builds: ["stable", "development"],
  },
  mortem: {
    color: 0xf08080,
  },
  "auto-mixins": {},
  skybridge: {
    color: 0xef161e,
    abbreviations: "bridge",
    allow_builds: ["master"],
  },
  "cats-file-format": {},
  catsquash: {},
  craftlight: {
    color: 0xfcfd97,
  },
  resourcepacks: {
    color: 0x55ff55,
    allow_builds: ["master"],
    file_type: "zip",
  },
  tooltipthingy: {
    color: 0xc6a0f6,
    abbreviations: "ttt",
    allow_builds: ["master"],
  },
};
