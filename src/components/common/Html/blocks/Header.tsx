import React, { FC } from 'react'
import { HeaderBlock, VisualDataBlock } from '@starlightcms/js-sdk'

import { addTargetBlank } from 'helpers'

const Header: FC<VisualDataBlock<HeaderBlock>> = ({ data }) => {
  const HeaderComponent = `h${data.level}` as 'h1'

  return (
    <HeaderComponent
      className="sl-content-block sl-header"
      dangerouslySetInnerHTML={{ __html: addTargetBlank(data.text) }}
    />
  )
}

export default Header
