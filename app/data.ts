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
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = []

export const WORK_EXPERIENCE: WorkExperience[] = []

export const BLOG_POSTS: BlogPost[] = [
  {
    title: '操作系统学习指北：从 CS162 劝退到 NJU 重燃',
    description:
      '操作系统是每个 CS 学生的必修课，但学习过程可能极度痛苦。记录我从伯克利 CS162 被劝退，到在 NJU 蒋炎岩老师课上重新找到学习动力的经历。',
    link: '/blog/os-learning-from-cs162-to-nju',
    uid: 'os-learning-from-cs162-to-nju',
  },
  {
    title: '摇摇欲坠的热气球：从 Agent 开发看软件工程的复杂性',
    description:
      '学习 Agent、Tools、Context Engineering，读 opencode 源码后，我开始理解软件工程真正的难题不在本地运行，而在于服务成千上万个不同环境的用户。',
    link: '/blog/the-shaky-hot-air-balloon-of-software',
    uid: 'the-shaky-hot-air-balloon-of-software',
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
