'use client'

import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  /** 按钮文字，默认"返回上一级" */
  label?: string
  /** 指定跳转路径，不传则调用 router.back() */
  href?: string
  /** 自定义点击逻辑 */
  onClick?: () => void
  className?: string
}

export function BackButton({
  label = '返回上一级',
  href,
  onClick,
  className,
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) return onClick()
    if (href) return router.push(href)
    router.back()
  }

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      className={cn(
        'fixed top-6 left-6 z-50',
        'flex items-center gap-1.5',
        'px-4 py-2',
        'bg-white/90 backdrop-blur-sm',
        'border border-zinc-200 dark:border-zinc-800',
        'rounded-lg',
        'text-sm text-zinc-500 dark:text-zinc-400',
        'hover:text-zinc-800 dark:hover:text-zinc-200',
        'hover:bg-white dark:hover:bg-zinc-900',
        'hover:border-zinc-300 dark:hover:border-zinc-700',
        'active:scale-[0.97]',
        'transition-all duration-150 ease-in-out',
        'shadow-sm hover:shadow-md',
        'select-none',
        'group',
        className
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-150 group-hover:-translate-x-0.5"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span>{label}</span>
    </button>
  )
}
