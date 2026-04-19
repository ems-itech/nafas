import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { siteSettings } from "./schemaTypes/siteSettings";
import { homepage } from "./schemaTypes/homepage";
import { localizedString } from "./schemaTypes/objects/localizedString";
import { localizedText } from "./schemaTypes/objects/localizedText";
import { localizedBlockContent } from "./schemaTypes/objects/localizedBlockContent";
import { cta } from "./schemaTypes/objects/cta";
import { heroSection } from "./schemaTypes/sections/heroSection";
import { aboutSection } from "./schemaTypes/sections/aboutSection";
import { servicesSection } from "./schemaTypes/sections/servicesSection";
import { gallerySection } from "./schemaTypes/sections/gallerySection";
import { packagesSection } from "./schemaTypes/sections/packagesSection";
import { appointmentSection } from "./schemaTypes/sections/appointmentSection";

export const schema = {
  types: [
    localizedString,
    localizedText,
    localizedBlockContent,
    cta,
    heroSection,
    aboutSection,
    servicesSection,
    gallerySection,
    packagesSection,
    appointmentSection,
    homepage,
    siteSettings,
  ],
};

export const studioTools = [
  structureTool({
    structure: (S) =>
      S.list()
        .title("Content")
        .items([
          S.listItem()
            .title("Site Settings")
            .id("siteSettings")
            .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
          S.divider(),
          S.listItem()
            .title("Homepage")
            .id("homepage")
            .child(S.document().schemaType("homepage").documentId("homepage")),
          S.divider(),
          ...S.documentTypeListItems().filter(
            (item) => !["siteSettings", "homepage"].includes(item.getId() ?? ""),
          ),
        ]),
  }),
  visionTool(),
];

