import { getAllMd } from './getAllMd'
import { getLastModifiedFiles } from './getLastModifiedFiles'
import path, { basename } from 'node:path'
import { CONFIG, DIR_WIKI } from '../constant'
import { random } from './random'
import { prodCache } from './prodCache'

function _getAllList(wikiName: string) {
  const toMarkdown = (files: string[]) => {
    return files
      .reduce((markdowns: string[], file: string) => {
        return [...markdowns, `- [${file}](${file})`]
      }, [])
      .join('\n')
  }

  const wikis = CONFIG.filter(w => !w.private).map(w => w.dir)
  const files = wikis.flatMap(wiki => {
    const dir = path.join(DIR_WIKI, wiki)

    return getAllMd(dir)
      .map((f: string) => f.replace(DIR_WIKI, ''))
      .map(stripExt)
  })

  const markdowns = toMarkdown(files)
  const wiki = CONFIG.find(w => w.dir === wikiName)

  if (!wiki) {
    throw new Error('wiki not found')
  }

  const lastModified = getLastModifiedFiles(wiki)

  return {
    files,
    markdowns,
    lastModified: toMarkdown(lastModified.map(stripExt)),
    getRandomLatestModifiedFileName() {
      if (lastModified.length === 0) {
        return
      }
      const index = random(lastModified.length)

      return basename(lastModified[index], '.md')
    },
  }
}

const stripExt = (f: string) => f.slice(0, -3)

export const getAllList = prodCache(_getAllList)
