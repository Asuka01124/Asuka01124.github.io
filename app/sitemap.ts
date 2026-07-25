import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'
import { BLOG_POSTS } from '@/app/data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${WEBSITE_URL}${post.link}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${WEBSITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...blogPosts,
  ]
}
