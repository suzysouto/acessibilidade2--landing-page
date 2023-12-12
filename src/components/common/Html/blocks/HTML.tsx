import React, { FC } from 'react'
import { HTMLBlock, VisualDataBlock } from '@starlightcms/js-sdk'

import { addTargetBlank } from 'helpers'

const HTML: FC<VisualDataBlock<HTMLBlock>> = ({ data }) => {
  return (
    <div
      className="sl-content-block sl-html test"
      dangerouslySetInnerHTML={{ __html: addTargetBlank(data.html) }}
    />
  )
}

export default HTML
