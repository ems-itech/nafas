import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { siteSettings } from "./schemaTypes/siteSettings";
import { service } from "./schemaTypes/service";
import { about } from "./schemaTypes/about";
import { hero } from "./schemaTypes/hero"; 
import { contact } from "./schemaTypes/contact";

export const schema = {
  types: [
    siteSettings,
    service,
    about,
    hero, 
    contact,
  ],
};

export const studioTools = [structureTool(), visionTool()];