export type WorkspaceId = string | number

type BaseUrl =
  | 'https://query.starlightcms.io/v2'
  | 'https://query.advancecomunicacao.com.br/v2'
  | string

export type StarlightConfig = {
  workspace?: WorkspaceId
  baseUrl?: BaseUrl
  debug?: boolean
}

interface ObjectTypes {
  [index: string]: any
}

export type StarlightResponse = {
  data?: ObjectTypes & ObjectTypes[]
  meta?: ObjectTypes
  links?: ObjectTypes
}
