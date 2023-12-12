import React, { useState, useContext, FunctionComponent, Fragment } from 'react'
import { AppProps } from 'next/app'
import { Global, ThemeProvider, css } from '@emotion/react'

import Starlight from '@starlightcms/react-sdk'

import AppContext from 'contexts/AppContext'

import { fonts } from 'consts'
import { useAppContext, useConsts, useGA } from 'hooks'
import { withGA } from 'hof'

import theme from 'styles/theme'
import cssBase from 'styles/globals'

// Will be called once for every metric that has to be reported.
export const reportWebVitals = withGA()

Starlight.configure({
  workspace: process.env.NEXT_PUBLIC_STARLIGHT_WORKSPACE,
  baseUrl: process.env.NEXT_PUBLIC_STARLIGHT_BASE_URL,
  debug: !!process.env.STARLIGHT_DEBUG,
})

const MyApp: FunctionComponent<AppProps & any> = ({
  Component,
  pageProps,
  err,
  nonce,
}) => {
  const [context, update] = useState(useContext(AppContext))
  const [slider, setSlider] = useState({} as { [k: string]: any })
  const ctx = {
    state: {
      ...context.state,
      slider,
      setSlider,
    },
    update,
  }
  const fontsList = Object.keys(fonts)

  useConsts(nonce)
  useGA()
  useAppContext(pageProps, update)

  return (
    <ThemeProvider theme={theme}>
      <Global styles={cssBase(theme)} />
      {fontsList?.map((name, index) => (
        <Fragment key={index}>
          {fonts[name]?.map((item, index2) => (
            <Fragment key={index2}>
              <Global
                styles={css`
                  @font-face {
                    font-family: ${`'${name}'`};
                    font-style: normal;
                    font-weight: ${item.weight};
                    font-display: swap;
                    src: url(${`/fonts/${item.src}`});
                  }
                `}
              />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <AppContext.Provider value={ctx}>
        <Component {...pageProps} err={err} />
      </AppContext.Provider>
    </ThemeProvider>
  )
}

export default MyApp
