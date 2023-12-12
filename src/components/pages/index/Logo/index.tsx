import ResponsiveImage from 'components/common/ResponsiveImage'
import { Content, Title } from './styles'
import { LogoTypes } from './types'

export const Logo = ({ page }: LogoTypes) => (
  <Content>
    <figure>
      <ResponsiveImage image={page.logo} alt="Logo" />
    </figure>
    <Title>{page.title}</Title>
  </Content>
)
