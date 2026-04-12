import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { siteSettings } from "./schemaTypes/siteSettings";
import { service } from "./schemaTypes/service";
import { about } from "./schemaTypes/about";
import { hero } from "./schemaTypes/hero"; 

export const schema = {
  types: [
    siteSettings,
    service,
    about,
    hero, 
  ],
};

export const studioTools = [structureTool(), visionTool()];