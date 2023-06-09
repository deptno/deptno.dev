import React from 'react'
import fs from 'node:fs/promises'
import { createRelativeLinkReplacer } from 'parser-vimwiki'
import { DIR_WIKI } from '../../../constant'
import { marked } from '../../../lib/marked'
import { redirect } from 'next/navigation'
import { Header } from '../../../component/Header'
import { NoPage } from '../../../component/NoPage'
import { Markdown } from '../../../component/Markdown'
import { MarkdownAside } from '../../../component/MarkdownAside'

export default async (props: Props) => {
  const { md } = props.params
  const path = md.join('/')
  const currentPath = md.slice(0, -1).join('/')

  try {
    const file = decodeURIComponent(`${DIR_WIKI}/${path}.md`)
    const markdown = await fs.readFile(file)
      .then((buffer) => buffer.toString())
      .then(createRelativeLinkReplacer(currentPath))
    const html = marked(markdown)

    return (
      <>
        <Header/>
        <Markdown data={html}>
          <MarkdownAside data={html} path={path} />
        </Markdown>
      </>
    )
  } catch (err) {
    if (!path.endsWith('index')) {
      return redirect(decodeURIComponent(`/wiki/${path}/index`))
    }

    return <NoPage name={path}/>
  }
}
type Props = {
  params: {
    md: string[]
  }
}

export async function generateMetadata({ params }: Props) {
  const path = params.md.join('/')

  return {
    openGraph: {
      locale: 'ko',
      siteName: 'https://deptno.dev',
      url: 'https://deptno.dev/wiki/' + path,
    },
  }
}
