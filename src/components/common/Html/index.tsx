import { VisualContent } from '@starlightcms/react-sdk'

import { addTargetBlank } from 'helpers'

import blocks from './blocks'
import { Content, Wrap as Div } from './styles'
import { HtmlTypes } from './types'

const Html = ({ Wrap = Div, html = null, ...props }: HtmlTypes) => (
  <Content {...props}>
    {typeof html === 'string' ? (
      <Wrap
        {...props}
        className="old-visual-content"
        dangerouslySetInnerHTML={{
          __html: addTargetBlank(html),
        }}
      />
    ) : html?.blocks?.length ? (
      <Wrap {...props}>
        <VisualContent
          content={html}
          components={{ ...blocks, ...props.blocks }}
        />
      </Wrap>
    ) : null}
  </Content>
)

export default Html
