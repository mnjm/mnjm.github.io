import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts/" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    summary: z.string(),
    lastModDate: z.date().optional(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    showMeta: z.boolean().default(true),
    readingTime: z.string().optional(),
  }),
});

export const collections = { posts };
