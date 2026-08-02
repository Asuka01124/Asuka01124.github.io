'use client'
import { motion } from 'motion/react'
import { FolderOpen, Briefcase, Edit3, Github, Tv, Mail, ExternalLink, ArrowRight, Terminal } from 'lucide-react'

import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import { ProjectVideo, ProjectImage } from '@/components/project-media'
import Link from 'next/link'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  FEATURES,
  EMAIL,
  SOCIAL_LINKS,
} from './data'

// --- 图标映射（避免 Tailwind JIT purge 问题） ---
const ICON_MAP: Record<string, React.ElementType> = {
  FolderOpen,
  Briefcase,
  Edit3,
}

const FEATURE_COLORS: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
  green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
}

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  Github,
  Bilibili: Tv,
}

// --- 动画常量 ---
const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

function getSocialIcon(label: string) {
  for (const [key, Icon] of Object.entries(SOCIAL_ICON_MAP)) {
    if (label.toLowerCase().includes(key.toLowerCase())) return Icon
  }
  return ExternalLink
}

// --- 格式化日期 ---
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// --- 主组件 ---
export default function Personal() {
  return (
    <motion.main
      className="space-y-20"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* ==================== Hero ==================== */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="grid md:grid-cols-2 gap-8 items-center py-8 md:py-16"
      >
        {/* 左侧文字 */}
        <div>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-1">
            Hi, 我是
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black dark:text-white">
            Asuka (Forest Yang)
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            软件工程学生在读
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed max-w-md">
            我对 AI Agent、动漫和游戏充满好奇，喜欢思考 Software Engineering、SWE Agent
            方向的问题。这里会记录我的学习、思考和灵感，欢迎交流。
          </p>

          {/* CTA 按钮 */}
          <div className="flex gap-3 mb-6">
            <Link
              href="/projects"
              className="px-5 py-2.5 bg-black text-white rounded-lg flex items-center gap-2 text-sm hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <ExternalLink size={16} /> 查看项目
            </Link>
            <Link
              href={`mailto:${EMAIL}`}
              className="px-5 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg flex items-center gap-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <Mail size={16} /> 联系我
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-zinc-400">
            {SOCIAL_LINKS.map((link) => {
              const Icon = getSocialIcon(link.label)
              return (
                <a
                  key={link.label}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>

        {/* 右侧图片卡片 */}
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[6/5] relative transition-shadow duration-300 hover:shadow-xl">
          <Spotlight size={250} />
          <Magnetic intensity={0.4} range={80}>
            <motion.img
              src="/avatar.png"
              alt="Asuka (Forest Yang)"
              className="object-cover w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
          </Magnetic>
        </div>
      </motion.section>

      {/* ==================== Feature 卡片 ==================== */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const IconComp = ICON_MAP[f.icon] || FolderOpen
            const colors = FEATURE_COLORS[f.color]
            return (
              <div
                key={f.title}
                className="bg-white dark:bg-zinc-900 rounded-[20px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}
                >
                  <IconComp size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">
                  {f.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                  {f.desc}
                </p>
                <Link
                  href={f.href}
                  className="text-sm font-medium flex items-center gap-1 text-black dark:text-white hover:underline"
                >
                  {f.linkText} <ArrowRight size={14} />
                </Link>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* ==================== 博客列表 ==================== */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex items-baseline justify-between mb-5">
          <h3 className="text-lg font-medium text-black dark:text-white">
            最新文章
          </h3>
          <Link
            href="/blog"
            className="text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
          >
            查看全部 <ArrowRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {BLOG_POSTS.slice(0, 4).map((post) => (
            <Link
              href={post.link}
              key={post.uid}
              className="flex gap-4 py-5 group items-center"
            >
              {/* 缩略图 */}
              {post.cover ? (
                <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
                  <Edit3 size={20} className="text-zinc-300 dark:text-zinc-500" />
                </div>
              )}

              {/* 文字区 */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-black dark:text-white group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors duration-200 truncate">
                  {post.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mt-0.5">
                  {post.description}
                </p>
              </div>

              {/* 日期 */}
              <span className="text-zinc-400 dark:text-zinc-500 text-sm whitespace-nowrap hidden sm:block">
                {formatDate(post.date)}
              </span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ==================== 个人项目展示 ==================== */}
      {PROJECTS.length > 0 && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-5 text-lg font-medium text-black dark:text-white">
            个人项目展示
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                  {project.video ? (
                    <ProjectVideo src={project.video} />
                  ) : project.image ? (
                    <ProjectImage src={project.image} />
                  ) : (
                    <Link
                      href={`/projects/${project.id}`}
                      className="block aspect-video w-full rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Terminal size={48} className="text-zinc-300 dark:text-zinc-500" />
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
                  <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ==================== 工作经验 ==================== */}
      {WORK_EXPERIENCE.length > 0 && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-5 text-lg font-medium text-black dark:text-white">
            工作经验
          </h3>
          <div className="flex flex-col space-y-2">
            {WORK_EXPERIENCE.map((job) => (
              <a
                className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                key={job.id}
              >
                <Spotlight
                  className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                  size={64}
                />
                <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                  <div className="relative flex w-full flex-row justify-between">
                    <div>
                      <h4 className="font-normal dark:text-zinc-100">
                        {job.title}
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {job.company}
                      </p>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {job.start} - {job.end}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.section>
      )}

    </motion.main>
  )
}
