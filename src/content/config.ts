// Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'
// Define a schema for each collection you'd like to validate.
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    info: z.string(),
    pubDate: z.date(),
    meta: z.string(),
    updateDate: z.date(),
  }),
})
// Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
}
