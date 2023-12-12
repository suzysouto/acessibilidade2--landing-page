import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export type ContextTypes = GetServerSidePropsContext & {
  [k: string]: any
} & { customData: any }

export type PropsTypes = (
  context: ContextTypes,
) => Promise<GetServerSidePropsResult<any>>
