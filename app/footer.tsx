'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextLoop } from '@/components/ui/text-loop'
import { MonitorIcon, MoonIcon, SunIcon, Github, Tv, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SOCIAL_LINKS } from './data'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex gap-1">
      <AnimatedBackground
        className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
        defaultValue={theme}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
        enableHover={false}
        onValueChange={(id) => {
          setTheme(id as string)
        }}
      >
        {THEMES_OPTIONS.map((theme) => {
          return (
            <button
              key={theme.id}
              className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
              type="button"
              aria-label={`Switch to ${theme.label} theme`}
              data-id={theme.id}
            >
              {theme.icon}
            </button>
          )
        })}
      </AnimatedBackground>
    </div>
  )
}

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  Github,
  Bilibili: Tv,
  Email: Mail,
}

function getSocialIcon(label: string) {
  for (const [key, Icon] of Object.entries(SOCIAL_ICON_MAP)) {
    if (label.toLowerCase().includes(key.toLowerCase())) return Icon
  }
  return null
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-100 dark:border-zinc-800 px-0 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="https://github.com/ibelick/nim" target="_blank">
            <TextLoop className="text-xs text-zinc-500">
              <span>© 2024 Asuka (Forest Yang). All rights reserved.</span>
              <span>Built with Motion-Primitives.</span>
            </TextLoop>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-zinc-400">
            {SOCIAL_LINKS.map((link) => {
              const Icon = getSocialIcon(link.label)
              return Icon ? (
                <a
                  key={link.label}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={18} />
                </a>
              ) : null
            })}
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
