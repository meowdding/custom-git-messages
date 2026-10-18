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
};
