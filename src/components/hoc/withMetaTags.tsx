import { NextSeo } from 'next-seo'
import { OpenGraphMedia } from 'next-seo/lib/types'

interface metaTagTypes {
  title?: string
  description?: string
  keywords?: string
  images?: OpenGraphMedia
  url?: string
  nextSeo?: any
}

interface propsTypes {
  [k: string]: any
}

export const withMetaTags = {
  name: 'metaTags',
  hoc:
    (
      Component: ({ ...props }: propsTypes) => JSX.Element,
      getMetaTags: ({ ...props }: propsTypes) => metaTagTypes,
    ) =>
    ({ page = null, ...props }) => {
      const { title, description, keywords, images, url, nextSeo } = getMetaTags
        ? getMetaTags({
            page,
            ...props,
          })
        : {
            title: null,
            description: null,
            keywords: null,
            images: null,
            url: null,
            nextSeo: null,
          }

      const seoTitle = title || page?.seo_title
      const seoDescription = description || page?.seo_description
      const seoKeywords = keywords || page?.seo_keywords

      return (
        <>
          <NextSeo
            title={seoTitle}
            description={seoDescription}
            openGraph={{
              title: seoTitle,
              description: seoDescription,
              type: 'website',
              url: url,
              images: images,
            }}
            twitter={{
              cardType: 'summary_large_image',
              site: '@advancecomunic',
              handle: 'advancecomunic',
            }}
            additionalMetaTags={[
              {
                name: 'keywords',
                content: seoKeywords,
              },
              {
                name: 'author',
                content: 'Advance Comunicação',
              },
            ]}
            {...nextSeo}
          />
          <Component page={page} {...props} />
        </>
      )
    },
}
