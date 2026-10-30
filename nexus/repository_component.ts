import { githubToken } from "../main.ts";
import { mappings } from "./compoent_mappings.ts";
import { NexusMessage } from "./mod.ts";
import { parse, stringify } from "jsr:@std/toml";

//deno-lint-ignore no-explicit-any
export const Component = async (body: any): Promise<NexusMessage | undefined> => {
  const component = body.component;

  if (!component) {
    console.log("nexus/Component: skipping message, no component");
    return;
  }
  if (component.format !== "maven2") {
    console.log("nexus/Component: skipping message, not maven2", component);
    return;
  }
  const group = component.group;
  const name = component.name;
  const version: string = component.version;
  const groupAndName = `${group}:${name}`;

  const config = mappings[groupAndName];
  if (!config) {
    console.log("nexus/Component: skipping message, no mapping for", groupAndName);
    return;
  }

  const updates = config.updates || [];

  if (/\d+\.\d+\.\d+/.test(version))
    console.log("nexus/Component: version matches regex, searching for updates");
    for (const x of updates) {
      console.log("nexus/Component: ", x);
      const res = await fetch(`https://api.github.com/repos/${x.owner}/${x.repo}/contents/${x.path || "gradle/libs.versions.toml"}`);
      if (!res.ok) {
        console.log("nexus/Component: Got bad response from github!", res);
        continue
      }

      const body = await res.json();
      const sha = body["sha"];
      const file = body["content"];
      const rawFile = atob(file);

      const data = parse(rawFile);
      data["versions"][x.versionKey || name] = version;

      const rawData = btoa(stringify(data));
      const body = {
        message: `chore: bump ${x.versionKey || name} to \`${version}\``,
        committer: {
          name: "Meowtomation",
          email: "meowtomation@mona.cat",
        },
        content: rawData,
        sha: sha,
      };
      
      console.log("nexus/Component: Trying to send update!", body);
      fetch(`https://api.github.com/repos/${x.owner}/${x.repo}/contents/${x.path || "gradle/libs.versions.toml"}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2026-03-10",
        },
        body: JSON.stringify(body),
      });
    }

  return {
    message: {
      embeds: [
        {
          title: `New version published!`,
          description: `Group: \`${group}\`, name: \`${name}\`\nVersion: \`${version}\``,
        },
      ],
    },
    component: groupAndName,
  };
};
