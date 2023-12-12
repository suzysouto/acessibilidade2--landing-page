import Starlight from '@starlightcms/react-sdk'

import { withHOC, withHOF } from 'helpers'

import Container from 'components/layout/Container'

import { Subtitle } from 'components/pages/index'

const { getStaticPaths, getStaticProps } = withHOF(
  async ({ revalidate, customData, params }) => {
    const generic = params?.generic as string
    //check if /favicon.ico (or any path with an extension) is called
    if (/\w+?[.]\w+/gi.test(generic)) {
      return {
        notFound: true,
      }
    }
    const page = await Starlight.singletons.get(generic)
    return {
      revalidate,
      props: {
        page: page?.data ?? {},
        ...customData,
      },
    }
  },
  {
    getStaticPaths: async () => {
      // const data = await Starlight.singletons.get('generico')
      // const list = await Starlight.collections[
      //   (data?.data?.data as { [k: string]: any })?.colecao.object.slug
      // ].items({ order: 'title:asc', limit: 1000 })
      const list = null
      const paths = list?.data?.length
        ? list.data.map((item: { [k: string]: any }) => ({
            params: { generic: item.slug },
          }))
        : []
      return { paths, fallback: 'blocking' }
    },
  },
)
export { getStaticPaths, getStaticProps }
export default withHOC(
  ({ page }) => (
    <Container>
      <Subtitle>{page.data?.titulo}</Subtitle>
    </Container>
  ),
  {
    metaTags: ({ page }) => {
      return {
        title: `Página Genérica - ${page.title ?? ''}`,
      }
    },
  },
)
