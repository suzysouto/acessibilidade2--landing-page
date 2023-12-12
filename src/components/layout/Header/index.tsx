import Anchor from 'components/common/Anchor'
import ResponsiveImage from 'components/common/ResponsiveImage'

import Container from '../Container'

import { Content, LogoImage, LogoText } from './styles'
import { HeaderTypes } from './types'

const Header = ({ data }: HeaderTypes) => (
  <Content>
    <Container>
      <Anchor href="/">
        <LogoImage>
          <ResponsiveImage image={data?.icone_logo} alt="Logo Ícone" />
        </LogoImage>
        <LogoText>
          <ResponsiveImage image={data?.icone_texto} alt="Starlight" />
        </LogoText>
      </Anchor>
    </Container>
  </Content>
)

export default Header
