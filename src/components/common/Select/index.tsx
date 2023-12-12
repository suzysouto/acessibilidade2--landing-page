import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'

import { useWindowSize } from 'hooks'
import ResponsiveImage from 'components/common/ResponsiveImage'

import {
  Content,
  Default,
  DefaultIndicator,
  DefaultText,
  DefaultWrap,
  Desktop,
  LengthFix,
  Mobile,
  Wrap,
} from './styles'
import { OptionsType, SelectTypes } from './types'

import indicator from './indicator--icon.svg'

const Options = ({
  options,
  List,
  Item,
  currentValue,
  setCurrentValue = null,
  optionsRef = null,
  ...props
}: OptionsType) => (
  <List {...props} ref={optionsRef}>
    {options?.map((item, index) => (
      <Item
        className={currentValue?.slug === item.slug ? 'current' : null}
        onClick={() => {
          if (setCurrentValue) setCurrentValue(item)
        }}
        key={index}
        value={item.slug}
      >
        {item.title}
      </Item>
    ))}
  </List>
)

const Select = ({
  name,
  currentValue,
  setCurrentValue,
  options,
}: SelectTypes) => {
  const defaultRef = useRef(null)
  const selectRef = useRef(null)
  const optionsRef = useRef(null)
  const { isMobile } = useWindowSize()
  const currentIndex = useMemo(
    () => options.findIndex((item) => item.slug === currentValue.slug),
    [currentValue, options],
  )
  const [show, setShow] = useState(false)
  const [isBottom, setIsBottom] = useState(true)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    console.log('here?')
    if (show && defaultRef?.current) {
      console.log('here!')
      const rect = (
        defaultRef.current as HTMLDivElement
      ).getBoundingClientRect() ?? { top: 0, bottom: 0 }
      const bottom = rect.top < window.innerHeight / 2
      setIsBottom(bottom)
      const height = bottom ? window.innerHeight - rect.bottom : rect.top
      setHeight(
        Math.floor((height - 16) / defaultRef?.current?.offsetHeight) *
          defaultRef?.current?.offsetHeight,
      )
      setTimeout(() => {
        defaultRef?.current?.focus()
      }, 0)
    }
  }, [show])
  const setCurrent = (val) => {
    setCurrentValue(val)
    setShow(false)
  }
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.code)
    setShow((old) => {
      const val =
        e.altKey && (e.code === 'ArrowDown' || e.code === 'ArrowUp')
          ? true
          : e.code === 'Escape'
            ? false
            : e.code === 'Space'
              ? !old
              : null
      if (val !== null) e.preventDefault()
      if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
        e.preventDefault()
        setCurrentValue(() => {
          if (defaultRef?.current && optionsRef?.current)
            optionsRef.current.scrollTop =
              (currentIndex * defaultRef.current.firstChild.offsetHeight) /
              defaultRef.current.offsetHeight //fix
          return options[currentIndex + (e.code === 'ArrowDown' ? 1 : -1)]
        })
      }
      return val ?? old
    })
  }
  useEffect(() => {
    const event = (e) => {
      if (isMobile || !selectRef?.current) return
      if (
        selectRef.current.contains(e.target) ||
        selectRef.current === e.target
      ) {
        setShow((old) => !old)
      } else setShow(false)
    }
    event(defaultRef?.current)
    document.addEventListener('click', event)
    return () => {
      document.removeEventListener('click', event)
    }
  }, [isMobile])

  return (
    <Content>
      <Wrap ref={selectRef}>
        <Default ref={defaultRef} tabIndex={0} onKeyDown={onKeyDown}>
          <DefaultWrap>
            <DefaultText>
              <span>{currentValue.title}</span>
              <Options options={options} List={LengthFix} Item="li" />
            </DefaultText>
            <DefaultIndicator>
              <ResponsiveImage src={indicator} />
            </DefaultIndicator>
          </DefaultWrap>
        </Default>
        {isMobile ? (
          <Options
            options={options}
            List={Mobile}
            Item="option"
            name={name}
            currentValue={currentValue}
            setCurrentValue={setCurrent}
            defaultValue={currentValue.slug}
          />
        ) : show ? (
          <Options
            optionsRef={optionsRef}
            options={options}
            List={Desktop}
            Item="li"
            isBottom={isBottom}
            height={height}
            currentValue={currentValue}
            setCurrentValue={setCurrent}
          />
        ) : null}
      </Wrap>
      <select name={`${name}-2`} defaultValue={currentValue.slug}>
        {options?.map((item, index) => (
          <option key={index} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
    </Content>
  )
}

export default Select
