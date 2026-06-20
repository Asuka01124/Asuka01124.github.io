'use client'
import { motion } from 'motion/react'
import { XIcon, FolderOpen, Briefcase, Edit3, Github, Tv, Mail, ExternalLink, ArrowRight } from 'lucide-react'

import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
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
  Email: Mail,
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

// --- 子组件 ---
type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-xl"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

function getSocialIcon(label: string) {
  for (const [key, Icon] of Object.entries(SOCIAL_ICON_MAP)) {
    if (label.toLowerCase().includes(key.toLowerCase())) return Icon
  }
  return ExternalLink
}

// --- 格式化日期 ---
function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
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
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[6/5]">
          <img
            src="/avatar.png"
            alt="Asuka (Forest Yang)"
            className="object-cover w-full h-full"
          />
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
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-md transition-shadow bg-white dark:bg-zinc-900"
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
          {BLOG_POSTS.map((post) => (
            <Link
              href={post.link}
              key={post.uid}
              className="flex gap-4 py-5 group items-center"
            >
              {/* 缩略图占位 */}
              <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
                <Edit3 size={20} className="text-zinc-300 dark:text-zinc-500" />
              </div>

              {/* 文字区 */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-black dark:text-white group-hover:underline truncate">
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
                  <ProjectVideo src={project.video} />
                </div>
                <div className="px-1">
                  <a
                    className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                    href={project.link}
                    target="_blank"
                  >
                    {project.name}
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
                  </a>
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

      {/* ==================== 链接 ==================== */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium text-black dark:text-white">
          链接
        </h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          欢迎随时通过{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>{' '}
          与我联系
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
