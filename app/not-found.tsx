import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-zinc-200 dark:text-zinc-800">404</h1>
      <h2 className="mt-4 text-xl font-medium text-black dark:text-white">
        页面未找到
      </h2>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        你访问的页面不存在或已被移除。
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-2.5 bg-black text-white rounded-lg text-sm hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        返回首页
      </Link>
    </div>
  )
}
