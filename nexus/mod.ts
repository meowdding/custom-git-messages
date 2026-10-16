import { ServiceResponse } from "../main.ts";

export const Nexus = async (
  //deno-lint-ignore no-explicit-any
  body: any,
  //deno-lint-ignore no-explicit-any
  request: any,
): Promise<ServiceResponse[] | undefined> => {
  console.log("Nexus request", body, request);
  return undefined;
};
