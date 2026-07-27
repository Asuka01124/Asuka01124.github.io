# asuka_web — Asuka 个人网站维护技能

## 项目概览

- **项目名**: Asuka 个人网站 (基于 [Nim](https://github.com/ibelick/nim) 模板)
- **技术栈**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Motion + MDX
- **部署**: GitHub Pages 静态导出 → https://asuka01124.github.io
- **源码仓库**: https://github.com/Asuka01124/Asuka01124.github.io
- **本地开发**: `npm run dev` → http://localhost:3000

## 核心架构

```
D:/nim/
├── app/                        # Next.js App Router 目录
│   ├── layout.tsx              # 根布局 (字体、ThemeProvider、Header/Footer)
│   ├── page.tsx                # 首页 (所有内容从 data.ts 读取)
│   ├── data.ts                 # ★ 网站数据中心 (项目、经历、博客、链接)
│   ├── header.tsx              # 顶部导航 (姓名 + 标语动画)
│   ├── footer.tsx              # 页脚 (主题切换 + 版权)
│   ├── globals.css             # Tailwind v4 入口 + sugar-high 代码高亮配色
│   ├── robots.ts               # robots.txt 生成
│   ├── blog/
│   │   ├── layout.tsx          # 博客文章统一布局 (滚动进度条 + 复制链接)
│   │   ├── page.tsx            # 博客列表页 (含封面缩略图)
│   │   └── <slug>/
│   │       └── page.mdx        # 每篇博客一个 MDX 文件
│   └── projects/
│       ├── page.tsx            # 项目列表页
│       └── (detail)/           # 项目详情 (路由组，不在 URL 中出现)
│           ├── layout.tsx
│           └── asukacode/
│               └── page.mdx
├── components/ui/              # UI 组件库 (全部 'use client')
│   ├── animated-background.tsx # 悬停/点击高亮滑动背景
│   ├── magnetic.tsx            # 鼠标磁吸效果
│   ├── morphing-dialog.tsx     # 变形模态对话框
│   ├── scroll-progress.tsx     # 滚动进度条
│   ├── spotlight.tsx           # 鼠标跟随聚光灯
│   ├── text-effect.tsx         # 文本逐字入场动画
│   ├── text-loop.tsx           # 文本循环切换
│   └── text-morph.tsx          # 文本变形切换
├── hooks/
│   └── useClickOutside.tsx     # 点击外部检测
├── lib/
│   ├── constants.ts            # WEBSITE_URL
│   └── utils.ts                # cn() 类名合并工具
├── mdx-components.tsx          # MDX 自定义组件 (Cover + PostMeta + 代码高亮)
├── public/                     # 静态资源
│   ├── projects/               # ★ 项目图片放这里
│   └── blog/                   # ★ 博客配图放这里
├── deploy.sh                   # 部署脚本
└── next.config.mjs             # output: 'export' + MDX 配置
```

## 数据流: data.ts → page.tsx

`app/data.ts` 是网站所有内容的**唯一数据源**，首页的 5 个区域都从这里读取：

### 类型定义

```typescript
// 项目展示
type Project = {
  name: string         // 项目名称
  description: string  // 简短描述
  link: string         // 项目链接 (外部URL)
  video?: string       // 视频路径, 如 "/projects/demo.mp4"
  image?: string       // 图片路径, 如 "/projects/demo.png"
  id: string           // 唯一标识
}

// 工作经历
type WorkExperience = {
  company: string      // 公司/组织名
  title: string        // 职位
  start: string        // 开始时间, 如 "2024"
  end: string          // 结束时间, 如 "Present" 或 "2025"
  link: string         // 公司链接
  id: string           // 唯一标识
}

// 博客文章
type BlogPost = {
  title: string        // 文章标题
  description: string  // 摘要
  link: string         // 路径, 如 "/blog/my-post"
  uid: string          // 唯一标识 (用于动画 key)
  date: string         // 发布日期, 如 "2026-07-21"
  cover?: string       // 封面图路径, 如 "/blog/my-cover.png" (可选)
}

// 社交链接
type SocialLink = {
  label: string        // 显示文字, 如 "Github"
  link: string         // 链接 URL
}
```

### 当前数据

- `PROJECTS` — 1 个项目: AsukaCode (终端 AI 编码助手)
- `WORK_EXPERIENCE` — 空数组 `[]` (待添加)
- `BLOG_POSTS` — 5 篇文章，按日期倒序排列
- `SOCIAL_LINKS` — Github + Bilibili
- `EMAIL` — `ziliny175@gmail.com`

## 组件 API 速查

### Spotlight — 鼠标聚光灯
```tsx
<Spotlight className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl" size={64} />
// Props: className?, size?: number (默认 200), springOptions?
```

### Magnetic — 磁吸效果
```tsx
<Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
  <a href="...">...</a>
</Magnetic>
// Props: children, intensity?: number (默认 0.6), range?: number (默认 100),
//        actionArea?: 'self' | 'parent' | 'global', springOptions?
```

### MorphingDialog — 变形对话框 (用于项目视频放大)
```tsx
<MorphingDialog transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
  <MorphingDialogTrigger>  {/* 点击触发的元素 */}
    <video src="..." autoPlay loop muted className="aspect-video w-full cursor-zoom-in rounded-xl" />
  </MorphingDialogTrigger>
  <MorphingDialogContainer>
    <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 dark:bg-zinc-950 dark:ring-zinc-800/50">
      <video src="..." autoPlay loop muted className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]" />
    </MorphingDialogContent>
    <MorphingDialogClose className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1">
      <XIcon className="h-5 w-5 text-zinc-500" />
    </MorphingDialogClose>
  </MorphingDialogContainer>
</MorphingDialog>
```

### ScrollProgress — 滚动进度条
```tsx
<ScrollProgress className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600" springOptions={{ bounce: 0 }} />
```

### TextEffect — 文本入场动画
```tsx
<TextEffect as="p" preset="fade" per="char" className="text-zinc-600" delay={0.5}>
  软件工程学生在读
</TextEffect>
// 预设: 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'
// per: 'word' | 'char' | 'line'
```

### TextLoop — 文本循环
```tsx
<TextLoop interval={2} transition={{ duration: 0.3 }}>
  <span>第一条消息</span>
  <span>第二条消息</span>
</TextLoop>
```

### TextMorph — 文本变形
```tsx
<TextMorph>{text}</TextMorph>  // text 变化时字符间平滑变形
```

### AnimatedBackground — 动画背景高亮
```tsx
<AnimatedBackground
  enableHover
  className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
  transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
>
  {items.map(item => (
    <Link key={item.id} data-id={item.id} href={item.link}>...</Link>
  ))}
</AnimatedBackground>
// 每个子元素必须有 data-id 属性
```

## 操作指南

### 添加博客文章

**Step 1**: 创建文章目录和 MDX 文件
```bash
mkdir -p app/blog/<英文-slug>
```

**Step 2**: 编写 `app/blog/<slug>/page.mdx`
```mdx
export const metadata = {
  title: '文章标题',
  description: '文章摘要，用于 SEO 和首页展示',
  alternates: {
    canonical: '/blog/<slug>',
  },
};

# 文章标题

<PostMeta date="2026-07-21T20:00:00" readingTime={6} />

正文内容 (Markdown 格式)...

<!-- 可选: 封面图 -->
<Cover src="/blog/my-cover.jpg" alt="描述" caption="图片来源" />
```

> ⚠️ **关键陷阱：两个地方的 date 格式不同！**
>
> - **`app/data.ts` 的 `BLOG_POSTS`** — 日期用 `"2026-07-21"` (YYYY-MM-DD 字符串)
> - **MDX 的 `<PostMeta date="..." />`** — 必须用**完整 ISO 时间** `"2026-07-21T20:00:00"` (含时间部分)
>
> 如果 MDX 中只写 `"2026-07-21"` 没带时间，`new Date()` 解析可能出错导致页面渲染异常。

MDX 中可用的特殊组件 (定义在 `mdx-components.tsx`):
- `<Cover src="..." alt="..." caption="..." />` — 封面图，点击可放大查看
- `<PostMeta date="ISO时间" readingTime={分钟数} />` — 文章元信息 (日期 + 阅读时间)
- 代码块自动使用 `sugar-high` 语法高亮

### MDX 写作参考

MDX 文件中可以混合 Markdown 和 React 组件。以下是完整写法参考：

#### 特殊组件详解

**`<Cover>`** — 封面图（带点击放大）

| 属性 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `src` | `string` | ✅ | 图片路径，如 `/blog/my-cover.jpg` |
| `alt` | `string` | ✅ | 图片描述文字（无障碍） |
| `caption` | `string` | ❌ | 图片下方的说明文字，空字符串可省略 |

```mdx
<Cover src="/blog/my-article.jpg" alt="文章封面" caption="图源: xxx" />
```

内部使用 `MorphingDialog` 实现点击放大，图片会自动适配深色/浅色模式。

**`<PostMeta>`** — 文章发布日期与阅读时间

| 属性 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `date` | `string` | ✅ | 完整 ISO 时间 `"2026-07-21T20:00:00"` |
| `readingTime` | `number` | ✅ | 预计阅读分钟数 |

```mdx
<PostMeta date="2026-07-21T20:00:00" readingTime={6} />
```

> **`readingTime` 估算参考**：`lib/reading-time.ts` 中定义中文 300 字/分钟、英文 200 词/分钟。一篇 1800 字的文章约为 6 分钟。

**`<LinkButton>`** — 外部链接按钮（用于项目详情页）

| 属性 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `href` | `string` | ✅ | 外部链接 URL |
| `children` | `ReactNode` | ✅ | 按钮显示文字 |

```mdx
<LinkButton href="https://github.com/Asuka01124/AsukaCode">查看源码</LinkButton>
```

渲染为带 GitHub 图标 + 圆角样式的按钮，支持深色模式。

#### Markdown 扩展语法 (GFM)

因为配置了 `remark-gfm`，MDX 支持以下 GitHub Flavored Markdown 语法：

| 语法 | 说明 | 示例 |
|---|---|---|
| 表格 | `\|` 分隔的表格 | 如上方的 Props 表格 |
| 删除线 | `~~text~~` | `~~删除的内容~~` |
| 任务列表 | `- [ ]` / `- [x]` | `- [x] 已完成` |
| 自动链接 | 直接写 URL | `https://example.com` |
| 脚注 | `[^1]` | 见下方 |

#### 代码块

````mdx
```javascript
const hello = "world"
console.log(hello)
```
````

代码块自动使用 `sugar-high` 进行语法高亮，配色方案为 Tokyo Night 风格。支持的语言由 `sugar-high` 决定，常见语言（js、ts、python、rust、bash 等）均有支持。

行内代码用单个反引号：`` `const x = 1` ``。

### 阅读时间估算工具

`lib/reading-time.ts` 提供了 `getReadingTime(text: string)` 函数，自动按语言计算阅读时间：

- 中文内容：300 字/分钟
- 英文内容：200 词/分钟
- 混合内容：分别计算后相加



**Step 3**: 在 `app/data.ts` 的 `BLOG_POSTS` 数组**开头**添加条目 (保持日期倒序):
```typescript
{
  title: '文章标题',
  description: '简短摘要',
  link: '/blog/<slug>',
  uid: '<slug>',
  date: '2026-07-21',
  cover: '/blog/<slug>.png',  // 有封面图就加上，没有可省略
}
```

### 为已有文章添加/更新封面图

用户上传图片后，**必须同时修改 3 个位置**，缺一不可：

**Step 1**: 复制图片到 `public/blog/`
```bash
cp "<源路径>" "D:/nim/public/blog/<slug>.<ext>"
```
支持的格式: PNG、JPG、AVIF 等。建议控制文件大小。

**Step 2**: 在 MDX 文件的 `<PostMeta>` 下方添加 `<Cover>` 组件
```mdx
<Cover src="/blog/<slug>.<ext>" alt="<文章标题>" caption="" />
```

**Step 3**: 在 `app/data.ts` 的 `BLOG_POSTS` 对应条目中添加 `cover` 字段
```typescript
cover: '/blog/<slug>.<ext>',
```

> **注意**: 首页 (`app/page.tsx`) 和博客列表页 (`app/blog/page.tsx`) 都会检查 `cover` 字段来决定显示封面缩略图还是占位图标。如果不上 `cover` 字段，两个页面都不会显示封面。

### 添加项目展示

**Step 1**: 将项目图片/视频放入 `public/projects/`

**Step 2**: 如需项目详情页，在 `app/projects/(detail)/<id>/` 下创建 `page.mdx`

**Step 3**: 在 `app/data.ts` 的 `PROJECTS` 数组中添加:
```typescript
{
  name: '项目名称',
  description: '一句话描述',
  link: 'https://github.com/...',  // 或项目网站
  image: '/projects/my-project.png',  // 图片路径
  id: 'my-project',
}
```

### 添加工作经历

在 `app/data.ts` 的 `WORK_EXPERIENCE` 数组中添加:
```typescript
{
  company: '公司/组织名',
  title: '职位',
  start: '2024',
  end: 'Present',  // 或具体年份如 '2025'
  link: 'https://...',
  id: 'job-1',
}
```

### 修改个人信息

- **自我介绍**: 直接编辑 `app/page.tsx` 中第一个 `<motion.section>` 里的 `<p>` 标签
- **姓名和标语**: 编辑 `app/header.tsx` 中的 `<Link>` 和 `<TextEffect>`
- **Email**: 修改 `app/data.ts` 中的 `EMAIL` 常量
- **社交链接**: 修改 `app/data.ts` 中的 `SOCIAL_LINKS` 数组
- **网站标题/描述**: 编辑 `app/layout.tsx` 中的 `metadata` 对象

### 修改页脚链接

编辑 `app/footer.tsx`:
- 页脚左侧的 GitHub 链接 (`href="https://github.com/ibelick/nim"`)
- 循环文字 (`TextLoop` 内的两个 `<span>`)

## 样式约定

- **CSS 框架**: Tailwind CSS v4 (无 tailwind.config.js, 配置在 globals.css 中)
- **主色调**: zinc/gray 中性色系
- **深色模式**: `dark:` 前缀, 由 `next-themes` 管理 (类名 `.dark`)
- **类名合并**: 使用 `cn()` from `lib/utils.ts` (clsx + tailwind-merge)
- **排版插件**: `@tailwindcss/typography` — 博客用 `prose prose-gray dark:prose-invert`
- **代码高亮配色**: `globals.css` 中 `:root` 下的 `--sh-*` CSS 变量 (Tokyo Night 风格)

## SEO 配置

项目已配置完整的 SEO 基础设施，涉及 3 个文件：

### 全局 Metadata (`app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://asuka01124.github.io/'),
  alternates: { canonical: '/' },
  title: {
    default: 'Asuka 的个人网站',
    template: '%s | Asuka',  // 子页面标题会自动拼接
  },
  description: 'Forest Yang (Asuka) 的个人网站 — ...',
}
```

- `metadataBase` — 所有相对路径的基础 URL，必须指向最终部署域名
- `title.template` — 子页面的 `%s` 会被替换为各页面自己的 title，生成 `<title>文章标题 | Asuka</title>`
- 每篇博客文章的 MDX 中导出 `metadata.title` 和 `metadata.description` 会自动被 Next.js 合并到页面 `<head>` 中

### Sitemap (`app/sitemap.ts`)

```typescript
export const dynamic = 'force-static'  // 静态导出必须加这一行
```

自动生成的 `sitemap.xml` 包含：
| 页面 | 更新频率 | 优先级 |
|---|---|---|
| 首页 `/` | weekly | 1.0 |
| 博客列表 `/blog` | weekly | 0.9 |
| 项目 `/projects` | monthly | 0.8 |
| 经历 `/experience` | monthly | 0.6 |
| 每篇博客 `/blog/<slug>` | monthly | 0.7 |

添加新博客文章后，`sitemap.ts` 会自动从 `app/blog/` 目录扫描所有 MDX 文件生成对应条目，无需手动修改。

### Robots.txt (`app/robots.ts`)

```typescript
export const dynamic = 'force-static'  // 静态导出必须加这一行
```

生成的 `robots.txt` 内容：
```
User-Agent: *
Allow: /
Disallow: /private/
Sitemap: https://asuka01124.github.io/sitemap.xml
```

> 注意：`/private/` 路由实际上不存在，只是预防性声明。如需真的隐藏某些页面，改为对应的实际路径。

### 博客文章 SEO

每篇 MDX 文章的 `metadata` 导出中：
- `title` — 会通过 `%s | Asuka` 模板拼接
- `description` — 用于 Google 搜索摘要和社交分享
- `alternates.canonical` — 防止搜索引擎认为是重复内容

```mdx
export const metadata = {
  title: '文章标题',
  description: '文章摘要，用于 SEO 和首页展示',
  alternates: { canonical: '/blog/my-post' },
}
```

## 构建与部署

```bash
# 本地开发
npm run dev

# 构建 + 部署到 GitHub Pages
bash deploy.sh
```

部署脚本 `deploy.sh` 自动完成: 构建 → 克隆目标仓库 → 清空旧文件 → 复制新文件 → 提交推送。
部署后等待 1-2 分钟刷新 https://asuka01124.github.io/。

**重要**: 每次修改后如果想立即看到线上效果，运行 `bash deploy.sh`。

## 关键约束

1. **所有页面组件** (`page.tsx`, `header.tsx`, `footer.tsx`, `blog/layout.tsx`) 都是 `'use client'` (因为用了 Motion 动画)
2. **配置文件** (`next.config.mjs`, `mdx-components.tsx`, `layout.tsx`) 是服务端组件
3. **静态导出**: `next.config.mjs` 中 `output: 'export'` — 不能用 API Routes、SSR、ISR
4. **route handler** 如 `robots.ts` 必须加 `export const dynamic = 'force-static'`
5. **GitHub Pages**: 下划线开头的目录 (`_next`) 需要 `.nojekyll` 文件防止被 Jekyll 忽略
6. **MDX 文件**放在 `app/blog/` 下自动成为路由, 不需要 `generateStaticParams`
7. **Google Fonts**: 使用 `next/font/google` 加载 Geist + Geist Mono, 构建时需要能访问 `fonts.googleapis.com`

## 标准工作流程

用户提出网站更新需求后，按以下流程执行：

1. **实现** — 按需求修改代码（组件/数据/博客/项目等）
2. **Review** — 将改动展示给用户确认，不要未经确认就提交
3. **Git 提交（本地）** — 用户确认后，提交到本地仓库：
   ```bash
   git add -A && git commit -m "<message>"
   ```
4. **部署到个人网站** — 运行部署脚本：
   ```bash
   bash deploy.sh
   ```
5. **验证** — 部署完成后告知用户，等待 1-2 分钟后访问 https://asuka01124.github.io/ 查看效果
