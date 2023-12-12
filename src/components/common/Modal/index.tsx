import { css, Global } from '@emotion/react'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Content } from './styles'

const Modal = ({ children, hide, selector = '#modal-root' }) => {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted
    ? ReactDOM.createPortal(
        <>
          <Global
            styles={css`
              html,
              body {
                overflow: hidden;
              }
            `}
          />
          <Content
            onClick={(e) => {
              if (!e || e.target === e.currentTarget) hide()
            }}
          >
            <div style={{ minHeight: 0, position: 'relative' }}>{children}</div>
          </Content>
        </>,
        ref.current,
      )
    : null
}

export default Modal
