import { ResponsiveImage, ResponsiveImageProps } from '@starlightcms/react-sdk'
import { ClassNames } from '@emotion/react'

const StarlightImage = ({
  image,
  className,
  ...props
}: ResponsiveImageProps) => (
  <ClassNames>
    {({ css, cx }) => {
      const meta =
        typeof image === 'string'
          ? null
          : image?.files?.find((file) => file.variation === 'original')?.meta
      const ratio = (meta?.width as number) / (meta?.height as number)
      return (
        <ResponsiveImage
          image={image}
          className={cx(
            className,
            isNaN(ratio)
              ? null
              : css`
                  aspect-ratio: ${ratio};
                `,
          )}
          {...props}
        />
      )
    }}
  </ClassNames>
)

export default StarlightImage
