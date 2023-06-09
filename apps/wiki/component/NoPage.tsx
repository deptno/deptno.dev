import React, { FC } from 'react'
import { Header } from './Header'
import { getGraph } from '../getGraph'
import { LinkGraph } from './LinkGraph'
import { URL_WIKI } from '../constant'

// @ts-ignore
export const NoPage: FC<Props> = async (props) => {
  const graph = await getGraph()
  const [ path ] = props.name.split('/')
  const g = graph.getLinkGraphData(path)

  return (
    <>
      <Header/>
      <div className="w-full flex flex-col items-center justify-center h-screen">
        <span>존재하지 않는 문서입니다.</span>
        <a className="underline border-l-blue-400" href={`${URL_WIKI}/${path}.md`} target="_blank">생성하기</a>
        <LinkGraph graphData={g}/>
      </div>
    </>
  )
}

type Props = {
  name: string
}
