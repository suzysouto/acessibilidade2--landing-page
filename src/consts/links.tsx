import { brandingFonts } from 'components/layout/Branding'

export const links = {
  stylesheet: [brandingFonts],
  icon: [],
}

export const HeadLinks = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
  </>
)
