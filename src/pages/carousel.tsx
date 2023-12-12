import Starlight from '@starlightcms/react-sdk'
import { useEffect, useRef, useState } from 'react'
import Glide from '@glidejs/glide'

import { withHOC, withHOF } from 'helpers'

import { useWindowSize } from 'hooks'
import Carousel from 'components/common/Carousel'

import { Subtitle, Logo } from 'components/pages/index'
import { Content, Item, Normalize } from 'components/pages/carousel'

const { getStaticProps } = withHOF(async ({ revalidate, customData }) => {
  const page = await Starlight.singletons.get('home')
  return {
    revalidate,
    props: {
      page: page?.data?.data ?? {},
      ...customData,
    },
  }
})
export { getStaticProps }
export default withHOC(
  ({ page }) => {
    const DEGREES = -30
    const PER_VIEW = 1
    const { width } = useWindowSize()
    const ref = useRef(null)
    const slideRef = useRef(null)
    const [current, setCurrent] = useState(-1)

    useEffect(() => {
      const slider = ref.current
        ? new Glide(ref.current, {
            perView:
              PER_VIEW *
              (width /
                (width -
                  slideRef.current.offsetHeight /
                    Math.tan(((DEGREES + 90) * Math.PI) / 180))),
            gap: 0,
          })
        : null
      const mounted = slider ? slider?.mount() : null

      return () => {
        if (mounted) mounted.destroy()
      }
    }, [width, DEGREES])

    return (
      <Content>
        <Carousel ref={ref}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item, index) => (
            <Item
              ref={slideRef}
              key={index}
              degrees={DEGREES}
              isActive={index === current}
              index={index}
              onClick={() => {
                setCurrent(index)
              }}
            >
              <Normalize degrees={DEGREES}>
                <Logo page={page} />
                <Subtitle>{page.subtitle}</Subtitle>
              </Normalize>
            </Item>
          ))}
        </Carousel>
      </Content>
    )
  },
  {
    metaTags: () => {
      return {
        title: `Carrossel`,
      }
    },
  },
)
