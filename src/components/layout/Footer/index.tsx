import Container from '../Container'

import { Content } from './styles'
import { FooterTypes } from './types'

const Footer = ({ data }: FooterTypes) => {
  return (
    <Content>
      <Container>
        <span>{data?.copyright}</span>
      </Container>
    </Content>
  )
}
export default Footer
