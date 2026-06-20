import Link from 'next/link'
import { BLOG_POSTS } from '../data'
import { Edit3 } from 'lucide-react'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  return (
    <div className="py-8 not-prose">
      <h1 className="text-2xl font-bold mb-8 text-black dark:text-white">
        博客
      </h1>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {BLOG_POSTS.map((post) => (
          <Link
            href={post.link}
            key={post.uid}
            className="flex gap-4 py-5 group items-center"
          >
            <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
              <Edit3 size={20} className="text-zinc-300 dark:text-zinc-500" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-black dark:text-white truncate">
                {post.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mt-0.5">
                {post.description}
              </p>
            </div>

            <span className="text-zinc-400 dark:text-zinc-500 text-sm whitespace-nowrap hidden sm:block">
              {formatDate(post.date)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
