import { createClient } from "@sanity/client";

const projectId = "0jy2w44t";
const dataset = "production";
const apiVersion = "2022-03-07";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});