type Project = {
  name: string
  description: string
  video?: string
  image?: string
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

export const PROJECTS: Project[] = [
  {
    name: 'AsukaCode',
    description: '轻量高效的终端 AI 编码助手，基于 Bun + TypeScript + OpenTUI，支持 26 个主流模型，编译为单文件二进制。',
    image: '/projects/asukacode.png',
    id: 'asukacode',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = []

export const BLOG_POSTS: BlogPost[] = [
  {
    title: '调试：一场与自己的对话',
    description:
      'debug 不只是在找代码的错——更多时候，你是在找自己思维里的漏洞。每一次"这不可能"到最后都变成了"原来如此"。',
    link: '/blog/debugging-conversation-with-yourself',
    uid: 'debugging-conversation-with-yourself',
    date: '2026-08-04',
    cover: '/blog/debugging-conversation-with-yourself.avif',
  },
  {
    title: '计算机的世界，就是一场巨大的封装',
    description:
      '从晶体管到 AI，计算机的历史就是一部封装史。AI 封装了整个人类知识库，其广度无人能敌——但它无法回答"为什么"。真正有价值的东西一定服务于人，而这是 AI 做不出的判断。',
    link: '/blog/the-great-encapsulation',
    uid: 'the-great-encapsulation',
    date: '2026-08-01',
    cover: '/blog/the-great-encapsulation.webp',
  },
  {
    title: '在命令行里安家',
    description:
      '当全世界都在追求更漂亮的 GUI、更丝滑的动画、更"人性化"的交互时，我却把越来越多的日常搬进了那个黑色的命令行窗口。这不是怀旧，而是一种经过深思熟虑的选择。',
    link: '/blog/living-in-the-terminal',
    uid: 'living-in-the-terminal',
    date: '2026-07-29',
    cover: '/blog/living-in-the-terminal.avif',
  },
  {
    title: '我如何用 AI 写代码（而不被 AI 带偏）',
    description:
      'Harness、Loop Engineering、Agent Orchestration——每隔两周就有一个新概念宣称"改变一切"。但说实话，Agent 根本不需要这么多花里胡哨的工程，你只需要把计划写清楚。',
    link: '/blog/how-i-code-with-ai',
    uid: 'how-i-code-with-ai',
    date: '2026-07-21',
    cover: '/blog/how-i-code-with-ai-cover.avif',
  },
  {
    title: '多 Agent 协作，也许只是一场热闹的菜市场',
    description:
      'Agent-Graph、Swarm、树形协作——多 Agent 架构看起来很酷，但实际效果真的比单个 Agent 更好吗？一个学生的反思与吐槽。',
    link: '/blog/rethinking-multi-agent',
    uid: 'rethinking-multi-agent',
    date: '2026-06-25',
    cover: '/blog/rethinking-multi-agent.png',
  },
  {
    title: 'AI 时代，为什么好的前端设计依然千金不换',
    description:
      '用过各种 UI 库和 AI 设计工具后，我发现真正好的 UI/UX 设计是一种"直觉"，需要大量工程经验的积累。AI 现在还做不到这一点，而前端设计在当下比以往任何时候都更重要。',
    link: '/blog/ui-ux-design-in-the-ai-era',
    uid: 'ui-ux-design-in-the-ai-era',
    date: '2026-06-18',
    cover: '/blog/ui-ux-design-cover.png',
  },
  {
    title: '操作系统学习指北：从 CS162 劝退到 NJU 重燃',
    description:
      '操作系统是每个 CS 学生的必修课，但学习过程可能极度痛苦。记录我从伯克利 CS162 被劝退，到在 NJU 蒋炎岩老师课上重新找到学习动力的经历。',
    link: '/blog/os-learning-from-cs162-to-nju',
    uid: 'os-learning-from-cs162-to-nju',
    date: '2026-06-15',
    cover: '/blog/os-learning-from-cs162-to-nju.png',
  },
  {
    title: '摇摇欲坠的热气球：从 Agent 开发看软件工程的复杂性',
    description:
      '学习 Agent、Tools、Skills、Context Engineering 的过程中，阅读 opencode 源码后，我开始理解软件工程真正的难题不在本地运行，而在于服务成千上万个不同环境的用户。',
    link: '/blog/the-shaky-hot-air-balloon-of-software',
    uid: 'the-shaky-hot-air-balloon-of-software',
    date: '2026-06-14',
    cover: '/blog/the-shaky-hot-air-balloon-of-software.png',
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
