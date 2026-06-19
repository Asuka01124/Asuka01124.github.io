import { Clock } from 'lucide-react'

interface PostMetaProps {
  date: string        // ISO 格式，如 "2024-07-20T14:35:00"
  readingTime: number  // 阅读时间（分钟）
}

export function PostMeta({ date, readingTime }: PostMetaProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mt-2 mb-8">
      <Clock className="h-3.5 w-3.5" />
      <time dateTime={date}>{formatDate(date)}</time>
      <span className="text-zinc-300 dark:text-zinc-600">·</span>
      <span>阅读时间：{readingTime} 分钟</span>
    </div>
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
