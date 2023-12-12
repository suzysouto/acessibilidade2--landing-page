import { cloneElement, isValidElement, Children, ReactNode } from 'react'

import { useWindowSize } from 'hooks'

interface ResponsiveColumnTypes {
  [k: string]: any
  children: ReactNode
  colIndex: number
  colLen: number
  spaceBetween?: boolean
  margin: string
}

const ResponsiveColumn = ({
  children,
  colIndex,
  colLen,
  spaceBetween,
  margin,
  ...props
}: ResponsiveColumnTypes) => {
  const { isMobile } = useWindowSize()
  const rowLen = Children.count(children)
  const style = (order: number) => {
    return {
      order,
      flexGrow: 1,
      width: isMobile ? '' : `calc(${100 / colLen}% - (${margin} * 2))`,
      margin: spaceBetween
        ? colIndex === 0
          ? `0 ${margin} 0 0`
          : colIndex + 1 === colLen
            ? `0 0 0 ${margin}`
            : `0 ${margin}`
        : `0 ${margin}`,
    }
  }
  const className = (cellIndex: number, extra = '') =>
    `${props?.className ?? ''} column column-${
      colIndex + 1
    } cell cell-${cellIndex} ${extra}`
  return (
    <>
      <div
        className={className(0, 'top')}
        style={{ ...props?.style, ...style(1) }}
      />
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...(child.props || {}),
            className: className(index + 1, child.props?.className),
            style: {
              ...child.props?.style,
              ...props?.style,
              ...style(index + 2),
            },
          })
        }
      })}
      <div
        className={className(rowLen + 1, 'bottom')}
        style={{ ...props?.style, ...style(rowLen + 2) }}
      />
    </>
  )
}

export default ResponsiveColumn
