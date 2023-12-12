import { useMemo } from 'react'
import { Content, Wrap, Anchor, Text, Logo } from './styles'

export const brandingFonts =
  'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400&display=swap'

const Branding = () => {
  const url = 'https://clientes.advance.com.br/starlight/'
  const items = [
    {
      text: 'Desenvolvido no',
      alt: 'Starlight logo marca',
      src: `${url}starlight.svg`,
      href: 'https://starlight.sh/',
    },
    {
      text: 'Criado por',
      alt: 'Advance logo marca',
      src: `${url}advance.svg`,
      href: 'https://www.advance.com.br/',
    },
  ]
  const date = useMemo(() => new Date().getTime().toString().slice(0, 7), [])

  return (
    <Content>
      <Wrap>
        {items?.map((item, index) => (
          <Anchor
            key={index}
            target="_blank"
            rel="noopener noreferrer nofollow"
            title={item.text}
            href={item.href}
          >
            <Text>{item.text}</Text>
            <Logo src={`${item.src}?cache=${date}`} alt={item.alt} />
          </Anchor>
        ))}
      </Wrap>
    </Content>
  )
}
export default Branding
