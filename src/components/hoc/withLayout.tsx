import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import styled from '@emotion/styled'

import { FallbackFonts } from 'consts'

import AppContext from 'contexts/AppContext'

import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Branding from 'components/layout/Branding'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.background};
  color: ${(p) => p.theme.colors.primary};
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

export const withLayout = {
  name: 'layout',
  hoc:
    (Component: ({ ...props }: { [k: string]: any }) => JSX.Element) =>
    ({ footer, header, ...props }) => {
      const context = useContext(AppContext)
      const headerData = (context.state.header || header)?.data
      const footerData = (context.state.footer || footer)?.data
      const [fallbackFonts, setFallbackFonts] = useState(false)
      const router = useRouter()

      useEffect(() => {
        setFallbackFonts(!document.fonts?.add)
      }, [])
      useEffect(() => {
        const handleRouteChange = () => {
          if (window.location.hash) {
            const fn = (...props) => {
              if (document.readyState === 'complete' || props[0])
                document
                  ?.getElementById(window.location.hash.replace('#', ''))
                  ?.scrollIntoView({ behavior: 'smooth' })
            }
            fn()
            document.addEventListener('readystatechange', fn)
            window.addEventListener(
              'scroll',
              () => {
                setTimeout(() => {
                  fn.call(null, true)
                }, 100)
                document.removeEventListener('readystatechange', fn)
              },
              { once: true },
            )
          }
        }
        handleRouteChange()
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange)
        }
      }, [router.events])

      return (
        <>
          {fallbackFonts ? <FallbackFonts /> : null}
          <Page>
            {headerData ? <Header {...props} {...headerData} /> : null}
            <Main>
              <Component {...props} />
            </Main>
            {footerData ? <Footer {...props} {...footerData} /> : null}
            <Branding />
          </Page>
        </>
      )
    },
}
