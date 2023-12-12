import { useMemo } from 'react'
import Image from 'next/legacy/image'

import { Content } from './styles'
import { ResponsiveImageTypes } from './types'

function ResponsiveImage({
  src,
  image,
  title,
  alt = title || image?.alt || '',
  objectFit,
  objectPosition,
  width,
  height,
  variation = 'optimized',
  ...props
}: ResponsiveImageTypes) {
  const { files } = image ?? {}
  const source = useMemo(() => {
    if (!files) return
    const choosedVariation = files.find((file) => file.variation === variation)
    return (
      choosedVariation || files.find((file) => file.variation === 'original')
    )
  }, [files, variation])
  const imgProps = useMemo(() => {
    let imgProps = {}
    if (
      (source && source.meta && source.meta.width && source.meta.height) ||
      (width && height) ||
      (src && src.width && src.height)
    )
      imgProps = objectFit
        ? { layout: 'fill' }
        : {
            objectFit: 'contain',
            objectPosition: 'center',
            width: width || source?.meta?.width || src?.width,
            height: height || source?.meta?.height || src?.height,
          }
    else
      imgProps = {
        layout: 'fill',
      }
    if (objectFit) imgProps['objectFit'] = objectFit
    if (objectPosition) imgProps['objectPosition'] = objectPosition
    return imgProps
  }, [objectFit, source, height, width, objectPosition, src])

  return (
    <Content>
      {src ?? source?.path ? (
        <Image
          {...props}
          {...imgProps}
          src={src ?? source.path}
          title={title}
          alt={alt}
        />
      ) : null}
    </Content>
  )
}

export default ResponsiveImage
