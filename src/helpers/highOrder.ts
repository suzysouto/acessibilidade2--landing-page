import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Starlight from '@starlightcms/react-sdk'

import { withLayout, withMetaTags } from 'components/hoc'
import {
  ContextTypes,
  PropsTypes,
  with404,
  withCache,
  withFooter,
  withHeader,
} from 'hof'

const defaultHandler: PropsTypes = async ({
  res,
  revalidate,
  customData,
}: ContextTypes) => {
  return {
    ...(res ? null : { revalidate }),
    props: {
      res,
      ...customData,
    },
  }
}

const defaultOptions: {
  model?: string
  param?: string
  getStaticPaths?: GetStaticPaths
} = {
  model: '',
  param: '',
  getStaticPaths: null,
}

export const withHOF = (
  handler = defaultHandler,
  options = defaultOptions,
  list = [withHeader, withFooter, with404, withCache],
) => {
  const props = (func: PropsTypes, index?: number) => {
    index = index ?? 0
    if (index >= list.length) return func
    return props(list[index](func), index + 1)
  }
  const paths = async () => {
    if (!options.model || !options.param)
      return { paths: [], fallback: 'blocking' }
    const res = await Starlight[options.model].entries
      .list({
        limit: 100,
      })
      .catch(() => {
        return { data: [] }
      })
    const paths = res?.data.length
      ? res.data.map((item) => ({
          params: { [options.param]: item.slug },
        }))
      : []
    return { paths, fallback: 'blocking' }
  }
  return {
    ['getServerSideProps']: props(handler) as GetServerSideProps,
    ['getStaticProps']: props(handler) as GetStaticProps,
    ['getStaticPaths']: options?.getStaticPaths ?? (paths as GetStaticPaths),
  }
}

export const withHOC = (
  Component,
  args = {},
  list = [withMetaTags, withLayout],
) => {
  const fn = (comp, index = 0) => {
    if (index >= list.length) return comp
    return fn(list[index].hoc(comp, args[list[index].name]), index + 1)
  }
  return fn(Component)
}
