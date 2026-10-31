type AutoUpdate = {
  owner: string;
  repo: string;
  path?: string;
  versionKey?: string;
};

export const mappings: {
  [project: string]: {
    color?: number;
    abbreviations?: string;
    updates?: AutoUpdate[];
  };
} = {
  "tech.thatgravyboat:skyblock-api": {
    abbreviations: "sbapi",
    color: 0xfffffe,
    updates: [
      {
        owner: "meowdding",
        repo: "skyocean",
        versionKey: "skyblockapi",
      },
    ],
  },
  "me.owdding.meowdding-lib:meowdding-lib": {
    abbreviations: "mlib",
    color: 0x957dad,
    updates: [
      {
        owner: "meowdding",
        repo: "skyocean",
        versionKey: "meowdding-lib",
      },
    ],
  },
  "me.owdding.repo:remote-repo": {
    abbreviations: "remote-repo",
    color: 0x957dad,
    updates: [
      {
        owner: "meowdding",
        repo: "meowdding-lib",
        versionKey: "meowdding-remote-repo",
      },
    ],
  }
};
