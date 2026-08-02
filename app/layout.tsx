import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { WEBSITE_URL } from '@/lib/constants'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Asuka 的个人网站',
    template: '%s | Asuka',
  },
  description:
    'Forest Yang (Asuka) 的个人网站 — 记录 AI Agent、软件工程、前端设计的学习、思考与灵感。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Asuka 的个人网站',
    title: 'Asuka 的个人网站',
    description:
      'Forest Yang (Asuka) 的个人网站 — 记录 AI Agent、软件工程、前端设计的学习、思考与灵感。',
    images: [
      {
        url: '/avatar.png',
        width: 400,
        height: 400,
        alt: 'Asuka (Forest Yang)',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Asuka 的个人网站',
    description:
      'Forest Yang (Asuka) 的个人网站 — 记录 AI Agent、软件工程、前端设计的学习、思考与灵感。',
    images: ['/avatar.png'],
  },
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-geist)]">
            <div className="relative mx-auto w-full max-w-screen-lg flex-1 px-4 pt-20 md:px-6">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
