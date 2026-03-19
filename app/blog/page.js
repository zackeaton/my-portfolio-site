import { getPosts } from '@/lib/sanity'

export default async function Home() {
  const posts = await getPosts()
  const featuredPosts = posts.slice(0, 3)

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <header className="border-b border-zinc-800 px-8 py-6 flex items-center justify-between">
        <span className="text-sm tracking-widest uppercase text-zinc-400">My Portfolio</span>
        <a href="/blog" className="text-sm tracking-widest uppercase text-zinc-400 hover:text-white transition-colors">
          Blog
        </a>
      </header>

      {/* Hero */}
      <section className="px-8 pt-24 pb-20 border-b border-zinc-800">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-6">Available for work</p>
        <h1 className="text-8xl font-black uppercase leading-none tracking-tighter mb-8">
          Your<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
            Name
          </span>
        </h1>
        <p className="text-zinc-400 text-xl max-w-lg leading-relaxed mb-10">
          Developer building fast, thoughtful websites and applications. 
          Based in Brooklyn, NY.
        </p>
        {/* Social Links */}
        <div className="flex gap-6">
          <a href="mailto:you@email.com" className="text-sm tracking-widest uppercase text-zinc-400 hover:text-yellow-400 transition-colors">
            Email →
          </a>
          <a href="https://github.com" target="_blank" className="text-sm tracking-widest uppercase text-zinc-400 hover:text-yellow-400 transition-colors">
            GitHub →
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-sm tracking-widest uppercase text-zinc-400 hover:text-yellow-400 transition-colors">
            LinkedIn →
          </a>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="px-8 pt-16 pb-24">
        <div className="flex items-center justify-between mb-12">
          <p className="text-xs tracking-widest uppercase text-zinc-500">Latest Writing</p>
          <a href="/blog" className="text-xs tracking-widest uppercase text-zinc-500 hover:text-yellow-400 transition-colors">
            All Posts →
          </a>
        </div>
        <div className="divide-y divide-zinc-800">
          {featuredPosts.map((post, index) => (
            <a key={post._id} href={`/blog/${post.slug.current}`} className="group flex items-start gap-8 py-8 hover:bg-zinc-900 transition-colors duration-200 -mx-8 px-8">
              <span className="text-xs text-zinc-600 pt-2 w-6 shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-bold uppercase tracking-tight group-hover:text-yellow-400 transition-colors duration-200 mb-2">
                  {post.title}
                </h2>
                <p className="text-xs tracking-widest uppercase text-zinc-500">
                  {new Date(post.publishedAt).toISOString().split('T')[0]}
                </p>
              </div>
              <span className="text-zinc-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all duration-200 pt-2">→</span>
            </a>
          ))}
        </div>
      </section>

    </main>
  )
}