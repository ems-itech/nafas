import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { siteSettings } from "./schemaTypes/siteSettings";
import { service } from "./schemaTypes/service";

export const schema = {
  types: [siteSettings, service],
};

export const studioTools = [structureTool(), visionTool()];

