"use client";

import { defineConfig } from "sanity";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema, studioTools } from "./sanity/schema";

export default defineConfig({
  name: "default",
  title: "Nafas Studio",

  projectId,
  dataset,
  apiVersion,

  basePath: "/studio",

  plugins: studioTools,
  schema,
});

