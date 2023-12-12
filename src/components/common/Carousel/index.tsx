import {
  cloneElement,
  isValidElement,
  Children,
  useState,
  useEffect,
  useContext,
  useRef,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react'
import styled from '@emotion/styled'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'

import AppContext from 'contexts/AppContext'

import Container from 'components/layout/Container'

import { CarouselTypes } from './types'
import { Content, Item } from './styles'

const Mobile = styled.div`
  display: none;

  @media (max-width: ${(p) => p.theme.breakpoints.small}px) {
    display: block;
  }
`
const Desktop = styled.div`
  display: none;

  @media (min-width: ${(p) => p.theme.breakpoints.small + 1}px) {
    display: block;
  }
`

const Carousel: ForwardRefRenderFunction<
  any,
  CarouselTypes & { name?: string }
> = (
  {
    name = '',
    options = { perView: 1 },
    hasArrows = false,
    hasDots = false,
    dots = null,
    arrows = null,
    children,
  },
  ref,
) => {
  const context = useContext(AppContext)
  const sliderRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (ref || (name && context.state.slider[name])) return
    const slider = new Glide(sliderRef.current, options)
    const mounted = slider ? slider?.mount() : null
    slider?.on('run', () => {
      setCurrentIndex(mounted.index)
    })
    if (name) {
      context.state.slider[name] = mounted
      context.state.setSlider(context.state.slider)
    }
    if (Children.count(children) <= options.perView) mounted.disable()
    else if (mounted.disabled) mounted.enable()

    return () => {
      if (mounted) {
        if (name) {
          context.state.slider[name] = null
          context.state.setSlider(context.state.slider)
        }
        mounted.destroy()
      }
    }
  }, [options, context, name, ref, children])

  return (
    <Content ref={ref || sliderRef} className="glide" hasArrows={hasArrows}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {Children.map<ReactNode, ReactNode>(children, (slide, index) => {
            const props = (slide) => {
              return {
                className: `${slide.props.className ?? ''} glide__slide`,
              }
            }
            return (
              <Item key={index}>
                {isValidElement(slide)
                  ? cloneElement(slide, props(slide))
                  : null}
              </Item>
            )
          })}
        </ul>
      </div>

      {hasDots && (
        <div className="glide__bullets" data-glide-el="controls[nav]">
          {Children.map(children, (_, index) => (
            <div
              key={index}
              className={
                currentIndex === index
                  ? 'glide__bullet glide__bullet__active'
                  : 'glide__bullet glide__bullet__inactive'
              }
              data-glide-dir={`=${index}`}
            />
          ))}
        </div>
      )}

      {hasArrows && (
        <div>
          <Container>
            <div className="glide__arrows" data-glide-el="controls">
              <button className="glide-arrow" data-glide-dir="<" />
              <button className="glide-arrow" data-glide-dir=">" />
            </div>
          </Container>
        </div>
      )}

      <Desktop>
        {arrows && children.length > options.perView ? arrows : null}
      </Desktop>
      <Mobile>
        {/* Tip: the 1 below is the same as options.breakpoints[theme.breakpoints.small].perView */}
        {arrows && children.length > 1 ? arrows : null}
      </Mobile>

      {dots ? dots : null}
    </Content>
  )
}

export default forwardRef(Carousel)
