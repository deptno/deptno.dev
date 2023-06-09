import React, { FC } from 'react'
import { URL_WIKI } from '../constant'
import { TOC } from '../lib/TOC'
import { LinkGraph } from './LinkGraph'
import { getGraph } from '../getGraph'
import { LinkList } from './LinkList'

// @ts-ignore
export const MarkdownAside: FC<Props> = async (props) => {
  const { data, path = '' } = props
  const graph = await getGraph()
  const g = graph.getLinkGraphData(path)

  return (
    <div className="p-2">
      <aside id="sidebar" className="px-2 break-words border border-gray-800 3xl:text-md 3xl:border-hidden relataive">
        {!path.includes('/') && <div className="flex justify-end gap-2 border-b-2">
          <a className="underline border-l-blue-400" href={`${URL_WIKI}/${path}/_edit`} target="_blank">수정</a>
          <a className="underline border-l-blue-800" href={`${URL_WIKI}/${path}/_history`} target="_blank">기록</a>
        </div>}
        <TOC html={data}/>
        <LinkList graphData={g}/>
        <LinkGraph graphData={g}/>
      </aside>
    </div>
  )
}

type Props = {
  data: string
  path?: string
}
