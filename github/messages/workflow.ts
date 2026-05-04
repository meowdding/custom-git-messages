import { GithubMessage } from "../mod.ts";
import { projects } from "../projects.ts";

const defaultFileName = (x: string) => x.endsWith(".jar");

//deno-lint-ignore no-explicit-any
export const Workflow = async (
  body: any,
): Promise<GithubMessage | undefined> => {
  if (body.action !== "completed") {
    console.log("workflow_run/downloads: Not complete");
    return;
  }

  const repoOwner = body.repository.owner.login;
  const repoName = body.repository.name;
  const headBranch = body.workflow_run.head_branch;

  let project = projects[repoName.toLowerCase()];
  let allowedBranches = project?.allow_builds;
  if (allowedBranches === undefined) {
    console.log(
      "workflow_run/downloads:",
      repoName,
      "doesn't allow for any branches to upload.",
    );
    return;
  }

  const isAllowedBranch = allowedBranches(headBranch);

  if (isAllowedBranch === undefined || !isAllowedBranch) {
    console.log(
      "workflow_run/downloads:",
      headBranch,
      "not in allowed branches",
    );
    return;
  }

  if (body.workflow_run.conclusion !== "success") {
    console.log("workflow_run/downloads: No success");
    return;
  }

  let artifactsResponse = await fetch(body.workflow_run.artifacts_url).then(
    (x) => x.json(),
  );

  console.log("workflow_run/downloads: Fetched artifacts", artifactsResponse);

  let artifacts: {
    name: string;
    id: string;
  }[] = [];

  let file_type: (name: string) => boolean =
    project.file_filter || defaultFileName;

  (artifactsResponse?.artifacts || []).forEach((artifact) => {
    if (!file_type(artifact.name)) {
      console.log(
        "workflow_run/downloads: Skipping",
        artifact.name,
        `due to file type filter mismatch!`,
      );
      return;
    }
    console.log("workflow_run/downloads: Adding", artifact.name);
    artifacts.push({
      name: artifact.name,
      id: artifact.id,
    });
  });

  if (artifacts.length === 0) {
    console.log("workflow_run/downloads: Cancelling message, no artifacts!");
    return;
  }

  let description = "";
  description += `Branch: ${"`"}${headBranch}${"`"}\n`;
  description += `Commit Message\n${"```"}\n${body.workflow_run.head_commit.message.replace("`", /* wrap ` in zero width spaces */ "​`​")}\n${"```"}\n`;

  description += `${artifacts.length} Artifact${artifacts.length === 1 ? "" : "s"} published\n`;

  artifacts.forEach((artifact) => {
    description += `- [${artifact.name}](https://mods.meowdd.ing/${repoOwner}/${repoName}/${artifact.id})\n`;
  });

  return {
    message: {
      embeds: [
        {
          title: `${repoName} finished building!`,
          description: description,
          url: body.workflow_run.html_url,
        },
      ],
    },
    repo: repoName,
    type: "download",
  };
};
