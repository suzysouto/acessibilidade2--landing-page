import { useContext } from 'react'
import NextErrorComponent from 'next/error'

import AppContext from 'contexts/AppContext'

import Page404 from './404'
import Page500 from './500'

const CustomError = ({
  statusCode,
  hasGetInitialPropsRun = false,
  err = null,
}) => {
  const context = useContext(AppContext)

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
  }

  return (
    <>
      {context.state.header || context.state.footer ? (
        statusCode === 404 ? (
          <Page404
            header={context.state.header}
            footer={context.state.footer}
          />
        ) : (
          <Page500
            header={context.state.header}
            footer={context.state.footer}
          />
        )
      ) : (
        <p>
          Ocorreu um erro, mas já fomos informados do ocorrido. Tente novamente
          em alguns minutos.
        </p>
      )}
    </>
  )
}

CustomError.getInitialProps = async ({
  res,
  err,
  pathname,
  query,
  AppTree,
}) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
    pathname,
    query,
    AppTree,
  })

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  // errorInitialProps.hasGetInitialPropsRun = true

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (res?.statusCode === 404) {
    // Opinionated: do not record an exception in Sentry for 404
    return { statusCode: 404 }
  } else if (res?.statusCode === 500) {
    return { statusCode: 500 }
  }
  if (err) {
    return errorInitialProps
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry

  return errorInitialProps
}

export default CustomError
