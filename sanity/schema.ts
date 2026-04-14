import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { siteSettings } from "./schemaTypes/siteSettings";
import { service } from "./schemaTypes/service";
import { about } from "./schemaTypes/about";
import { hero } from "./schemaTypes/hero"; 
import { contact } from "./schemaTypes/contact";
import {packageType} from "./schemaTypes/package";
import {galleryType} from "./schemaTypes/gallery";

export const schema = {
  types: [
    siteSettings,
    service,
    about,
    hero, 
    contact,
    packageType,
    galleryType,


  ],
};

export const studioTools = [structureTool(), visionTool()];