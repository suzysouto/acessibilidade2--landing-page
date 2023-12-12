import Link from 'next/link'

import { withFooter, withHeader } from 'hof'
import { withHOC, withHOF } from 'helpers'

const { getStaticProps } = withHOF(
  async ({ customData }) => {
    return {
      revalidate: 60 * 60 * 24,
      props: { ...customData },
    }
  },
  null,
  [withHeader, withFooter],
)
export { getStaticProps }
export default withHOC(
  () => (
    <Link href="/" passHref>
      Página não encontrada 404
    </Link>
  ),
  {
    metaTags: () => {
      return {
        title: `Página não encontrada 404`,
      }
    },
  },
)
