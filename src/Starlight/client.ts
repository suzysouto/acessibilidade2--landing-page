import { StarlightConfig, StarlightResponse, WorkspaceId } from './types'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export default class StarlightClient {
  private debug: boolean
  private baseUrl: string
  private workspace: WorkspaceId

  constructor(config: StarlightConfig = {}) {
    this.configure(config)
  }

  public configure({ workspace, baseUrl, debug }: StarlightConfig) {
    this.baseUrl = baseUrl
    this.workspace = workspace
    this.debug = debug
  }

  private getBasePath() {
    if (!this.workspace) {
      throw new Error(
        'No Starlight workspace was configured. You may need to set one using Starlight.configure().',
      )
    }

    return `${this.baseUrl}/workspaces/${this.workspace}`
  }

  private error(message?: any, ...optionalParams: any[]) {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.error(message, ...optionalParams)
    }
  }

  private log(message?: any, ...optionalParams: any[]) {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(message, ...optionalParams)
    }
  }

  private async get(
    path: string,
    options: AxiosRequestConfig = {},
    fields?: { [key: string]: any },
    query = '',
    exact = false,
  ) {
    try {
      let q =
        !query && query !== null
          ? ''
          : exact
            ? `?query:word=${query ?? ''}`
            : `?query=${query ?? ''}`

      if (fields) {
        const fieldsNames = Object.keys(fields)

        const fieldsValues = fieldsNames.reduce((acc, field) => {
          let value: string

          if (typeof fields[field] === 'boolean') {
            value = `field:${field}=${fields[field]}`
          } else {
            value = `${field}=${fields[field]}`
          }

          if (!acc?.length) {
            return [value]
          } else {
            acc.push(value)

            return acc
          }
        }, [])

        q += (q ? '&' : '?') + fieldsValues.join('&')
      }

      const response = await axios.get<StarlightResponse>(
        this.getBasePath() + path + q,
        options,
      )

      this.log(`Starlight - GET ${path + q}`)

      return response.data
    } catch (_error) {
      const error: AxiosError = _error

      this.error(
        `Starlight - GET failed: ${path} — ${
          error.response?.status ?? 'UNKNOWN'
        } (${error.toString()})`,
      )

      throw error
    }
  }

  search = {
    entries: async (
      model: string,
      query = '',
      fields: { [key: string]: any },
      options: AxiosRequestConfig = {},
    ) => {
      return this.get(`/models/${model}/entries`, options, fields, query)
    },
  }

  exactSearch = {
    entries: async (
      model: string,
      query = '',
      fields: { [key: string]: any },
      options: AxiosRequestConfig = {},
    ) => {
      return this.get(`/models/${model}/entries`, options, fields, query, true)
    },
  }

  searchAll = {
    entries: async (
      query = '',
      fields: { [key: string]: any },
      options: AxiosRequestConfig = {},
    ) => {
      return this.get(`/search/entries`, options, fields, query)
    },
  }
}
