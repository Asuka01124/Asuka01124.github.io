'use client'
import { Terminal } from 'lucide-react'
import Link from 'next/link'

import { BackButton } from '@/components/ui/back-button'
import { Spotlight } from '@/components/ui/spotlight'
import { ProjectVideo, ProjectImage } from '@/components/project-media'
import { PROJECTS } from '@/app/data'

export default function ProjectsPage() {
  if (PROJECTS.length === 0) {
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

  return (
    <>
      <BackButton label="返回上一级" />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-10 text-2xl font-bold text-black dark:text-white">
          个人项目
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.id} className="space-y-3">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                {project.video ? (
                  <ProjectVideo src={project.video} />
                ) : project.image ? (
                  <ProjectImage src={project.image} />
                ) : (
                  <Link
                    href={`/projects/${project.id}`}
                    className="relative overflow-hidden block aspect-video w-full rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Spotlight
                      className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                      size={64}
                    />
                    <Terminal size={48} className="text-zinc-300 dark:text-zinc-500 relative z-10" />
                  </Link>
                )}
              </div>
              <div className="px-1">
                <Link
                  className="font-base inline-block font-[450] text-zinc-900 dark:text-zinc-50 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors duration-200"
                  href={`/projects/${project.id}`}
                >
                  {project.name}
                </Link>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
