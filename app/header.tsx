'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '工作经验', href: '/experience' },
  { label: '项目', href: '/projects' },
  { label: '博客', href: '/blog' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="mb-12 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Asuka (Forest Yang)
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          软件工程学生在读
        </TextEffect>
      </div>
      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-1.5 text-sm transition-colors hover:text-black dark:hover:text-white ${
                isActive
                  ? 'font-medium text-black dark:text-white'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-black dark:bg-white" />
              )}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
