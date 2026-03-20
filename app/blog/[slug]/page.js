import Image from 'next/image'
import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

async function getPost(slug) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      body,
      author-> { name },
      mainImage {
        asset-> {
          url,
          metadata {
            dimensions
          }
        },
        alt
      }
    }`,
    { slug }
  )
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <header className="border-b border-zinc-800 px-8 py-6 flex items-center justify-between">
        <a href="/" className="text-sm tracking-widest uppercase text-zinc-400 hover:text-white transition-colors">
          My Portfolio
        </a>
        <a href="/blog" className="text-sm tracking-widest uppercase text-zinc-400 hover:text-white transition-colors">
          ← Blog
        </a>
      </header>

      <article className="px-8 pt-20 pb-24 max-w-2xl">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-6">
          {new Date(post.publishedAt).toISOString().split('T')[0]}
        </p>
        <h1 className="text-6xl font-black uppercase leading-none tracking-tighter mb-12">
          {post.title}
        </h1>
        {post.mainImage?.asset?.url && (
          <div className="mb-12 inline-block bg-white p-4 pb-6 shadow-xl" style={{ boxShadow: '4px 4px 16px rgba(0,0,0,0.4)' }}>
            <div className="relative w-72 h-72">
              <Image
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {post.author?.name && (
              <p className="text-center mt-2 text-zinc-700 text-lg" style={{ fontFamily: 'var(--font-permanent-marker)' }}>
                {post.author.name}
              </p>
            )}
          </div>
        )}
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300 leading-relaxed">
          {post.body && <PortableText value={post.body} />}
        </div>
      </article>

    </main>
  )
}