type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
  date: string
  cover?: string
}

type Feature = {
  icon: string
  title: string
  desc: string
  href: string
  linkText: string
  color: 'blue' | 'green' | 'purple'
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = []

export const WORK_EXPERIENCE: WorkExperience[] = []

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'AI 时代，为什么好的前端设计依然千金不换',
    description:
      '用过各种 UI 库和 AI 设计工具后，我发现真正好的 UI/UX 设计是一种"直觉"，需要大量工程经验的积累。AI 现在还做不到这一点，而前端设计在当下比以往任何时候都更重要。',
    link: '/blog/ui-ux-design-in-the-ai-era',
    uid: 'ui-ux-design-in-the-ai-era',
    date: '2026-06-18',
  },
  {
    title: '操作系统学习指北：从 CS162 劝退到 NJU 重燃',
    description:
      '操作系统是每个 CS 学生的必修课，但学习过程可能极度痛苦。记录我从伯克利 CS162 被劝退，到在 NJU 蒋炎岩老师课上重新找到学习动力的经历。',
    link: '/blog/os-learning-from-cs162-to-nju',
    uid: 'os-learning-from-cs162-to-nju',
    date: '2026-06-15',
  },
  {
    title: '摇摇欲坠的热气球：从 Agent 开发看软件工程的复杂性',
    description:
      '学习 Agent、Tools、Context Engineering，读 opencode 源码后，我开始理解软件工程真正的难题不在本地运行，而在于服务成千上万个不同环境的用户。',
    link: '/blog/the-shaky-hot-air-balloon-of-software',
    uid: 'the-shaky-hot-air-balloon-of-software',
    date: '2026-06-14',
  },
]

export const FEATURES: Feature[] = [
  {
    icon: 'FolderOpen',
    title: '个人项目',
    desc: '一些有趣的想法和实践，持续更新中...',
    href: '/projects',
    linkText: '查看全部',
    color: 'blue',
  },
  {
    icon: 'Briefcase',
    title: '工作经验',
    desc: '参与过的项目与实践，在真实场景中学习与成长。',
    href: '/experience',
    linkText: '查看全部',
    color: 'green',
  },
  {
    icon: 'Edit3',
    title: '博客',
    desc: '记录学习、思考与灵感，欢迎交流。',
    href: '/blog',
    linkText: '阅读博客',
    color: 'purple',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/Asuka01124',
  },
  {
    label: 'Bilibili',
    link: 'https://space.bilibili.com/261078289',
  },
]

export const EMAIL = 'ziliny175@gmail.com'
