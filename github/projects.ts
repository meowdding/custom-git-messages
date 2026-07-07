function branches(...branches: string[]): (branch: string) => boolean {
  return (branch) => branches.includes(branch);
}

export const projects: {
  [project: string]: {
    color?: number;
    abbreviations?: string;
    allow_builds?: (branch: string) => boolean;
    file_filter?: (file: string) => boolean;
    push_branches?: (branch: string) => boolean;
    forum_thread?: string;
  };
} = {
  "custom-git-messages": {
    color: 1,
    abbreviations: "cm",
  },
  "skyblock-pv": {
    color: 0xf6b8d0,
    abbreviations: "pv",
    allow_builds: branches("master"),
    forum_thread: "1520292964470095872",
  },
  "skyblock-pv-backend": {
    color: 0xfc5203,
    abbreviations: "pv-backend",
  },
  skycubed: {
    color: 0xd1feb8,
    abbreviations: "sc",
    allow_builds: branches("master"),
    forum_thread: "1520292194274246739",
  },
  customscoreboard: {
    color: 0xf1beb5,
    abbreviations: "cs",
    allow_builds: branches("main"),
    forum_thread: "1520293540465348729",
  },
  skyocean: {
    color: 0xa4d8d8,
    abbreviations: "so",
    allow_builds: branches("main"),
    forum_thread: "1520292363971334215",
  },
  "skyblock-rpc": {
    color: 0xf8c57c,
    abbreviations: "rpc",
    allow_builds: branches("master"),
    forum_thread: "1520293872696299521",
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
    allow_builds: branches("master"),
    forum_thread: "1520294891710713917",
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
    allow_builds: branches("main"),
    forum_thread: "1520291236655792211",
  },
  mortem: {
    color: 0xf08080,
  },
  "auto-mixins": {},
  skybridge: {
    color: 0xef161e,
    abbreviations: "bridge",
    allow_builds: branches("master"),
    forum_thread: "1520295096610721912",
  },
  "cats-file-format": {},
  catsquash: {},
  craftlight: {
    color: 0xfcfd97,
  },
  resourcepacks: {
    color: 0x55ff55,
    allow_builds: branches("master"),
    file_filter: (_) => true,
    forum_thread: "1520294574516469760",
  },
  "eureka-pack": {
    color: 0x55ffff,
  },
  tooltipthingy: {
    color: 0xc6a0f6,
    abbreviations: "ttt",
    allow_builds: branches("master"),
    forum_thread: "1520291815524270214",
  },
  "repo-data": {},
  "hypixel-pack": {
    color: 0xfdcc4b,
    push_branches: branches("26.2", "alpha/26.2"),
  },
};
