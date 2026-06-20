'use client'
import { BackButton } from '@/components/ui/back-button'

export default function ProjectsPage() {
  return (
    <>
      <BackButton label="返回上一级" />
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
          个人项目
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          项目正在整理中，敬请期待...
        </p>
      </div>
    </>
  )
}
