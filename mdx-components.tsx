import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'
import { PostMeta } from '@/components/post-meta'
import { Github, XIcon } from 'lucide-react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    PostMeta,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <MorphingDialog
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.3,
          }}
        >
          <MorphingDialogTrigger>
            <figure className="cursor-zoom-in">
              <img src={src} alt={alt} className="rounded-xl" />
              {caption && <figcaption className="text-center">{caption}</figcaption>}
            </figure>
          </MorphingDialogTrigger>
          <MorphingDialogContainer>
            <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 dark:bg-zinc-950 dark:ring-zinc-800/50">
              <img
                src={src}
                alt={alt}
                className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
              />
              {caption && (
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-2">
                  {caption}
                </p>
              )}
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
    },
    LinkButton: ({
      href,
      children,
    }: {
      href: string
      children: React.ReactNode
    }) => {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="not-prose inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm text-zinc-900 no-underline ring-1 ring-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:ring-zinc-400 hover:shadow-md dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:ring-zinc-600 dark:hover:shadow-lg dark:hover:shadow-black/20"
        >
          <Github size={16} />
          {children}
        </a>
      )
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
  }
}
