export const IS_PROD = process.env.NODE_ENV === 'production'
export const DIR_WIKI = process.env.DIR_WIKI
export const DIR_DIARY = process.env.DIR_DIARY ?? 'diary'
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT
export const GIT_BRANCH = process.env.NEXT_PUBLIC_GIT_BRANCH ?? 'main'
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
export const MS_CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID
export const NEXT_PUBLIC_MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST
export const URL_ME = process.env.URL_ME
export const URL_WIKI = process.env.URL_WIKI
export const CURRENT_REVISION = '.CURRENT_REVISION'
