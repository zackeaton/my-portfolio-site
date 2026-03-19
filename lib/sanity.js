import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'jbggvvd7',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export async function getPosts() {
  return await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    body
  }`)
}