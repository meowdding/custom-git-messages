import { GithubMessage } from "../mod.ts";
import { projects } from "../projects.ts";

//deno-lint-ignore no-explicit-any
export const Workflow = async (
  body: any,
): Promise<GithubMessage | undefined> => {
  if (body.action !== "completed") {
    return;
  }

  const repoName = body.repository.name;
  const headBranch = body.workflow_run.head_branch;

  const isAllowedBranch =
    projects[repoName.toLowerCase()].allow_builds?.includes(headBranch);

  if (!isAllowedBranch) {
    return;
  }

  if (body.workflow_run.conclusion !== "failure") {
    return;
  }

  let artifactsResponse = await fetch(body.workflow_run.artifacts_url).then(
    (x) => x.json(),
  );

  let artifacts: {
    name: string;
    id: string;
  }[] = [];

  (artifactsResponse?.artifacts || []).forEach((artifact) => {
    if (!artifact.name.endsWith(".jar")) return;
    artifacts.push({
      name: artifact.name,
      id: artifact.id,
    });
  });

  if (artifacts.length === 0) return;

  let description = "";

  description += `${artifacts.length} Artifact${artifacts.length === 1 ? "" : "s"} published\n`;

  artifacts.forEach((artifact) => {
    description += `- [${artifact.name}]( https://meowdd.ing/download/${repoName}/${artifact.id})\n`;
  });

  return {
    message: {
      embeds: [
        {
          title: `${repoName} finished building!`,
          fields: [
            {
              name: "Branch",
              value: headBranch,
              inline: true,
            },
          ],
          description: description,
          url: body.workflow_run.html_url,
        },
      ],
    },
    repo: repoName,
    type: "download",
  };
};
