// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a schema for each collection you'd like to validate.
const blogCollection = defineCollection({
	type: 'content',
    schema: z.object({
      title: z.string(),
      info: z.string(),
      pubDate: z.string().transform((str) => new Date(str)),
      meta: z.string()
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
    blog: blogCollection,
};
