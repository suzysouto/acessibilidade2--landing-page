import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { AppType } from 'next/app'
import { ComponentType, Fragment } from 'react'

import { fonts, BodyScripts, HeadLinks, HeadScripts } from 'consts'

import crypto from 'crypto'
import { v4 } from 'uuid'

const generateCsp = (): { csp: string; nonce: string } => {
  const production = process.env.NODE_ENV === 'production'
  const hash = crypto.createHash('sha256')
  hash.update(v4())
  const nonce = hash.digest('base64')
  const csp = `
base-uri 'self';
default-src 'self';
manifest-src 'self';
object-src 'self' data:;
frame-ancestors 'none';
script-src-attr 'none';
connect-src 'self' https://*;
frame-src https://*;
font-src 'self' https://fonts.gstatic.com;
block-all-mixed-content;
upgrade-insecure-requests;
style-src 'unsafe-inline' 'self' https://fonts.googleapis.com https://cdn.privacytools.com.br;
form-action 'self' https://*.starlightcms.io https://*.advancecomunicacao.com.br https://*.advance.com.br;
img-src 'self' https://*.advance.com.br https://media-selene-development.s3.amazonaws.com https://*.starlightcms.io https://*.google.com https://*.google.com.br https://*.google-analytics.com https://*.facebook.com https://vercel.live https://cdn.privacytools.com.br data:;
script-src 'self' ${
    production ? '' : "'unsafe-eval'"
  } 'nonce-${nonce}' https://*.facebook.net https://cdn.privacytools.com.br https://*.cloudfront.net https://*.googletagmanager.com;
`.replace(/\n/g, ' ')

  return { csp, nonce }
}

class CustomNextScript extends NextScript {}
class CustomHead extends Head {}
CustomHead.prototype.getPreloadMainLinks = () => []
CustomHead.prototype.getPreloadDynamicChunks = () => []

const CustomDocument = class extends Document<{
  nonce: string
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage
    const res = ctx?.res
    const { csp, nonce } = generateCsp()

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp:
          (App: AppType | ComponentType<{ nonce: string }>) => (props) => {
            return <App nonce={nonce} {...props} />
          },
      })
    if (res != null && !res.headersSent) {
      res.setHeader('Content-Security-Policy', csp)
    }
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      nonce,
    }
  }
  render() {
    const { nonce } = this.props
    const fontsList = Object.keys(fonts)

    return (
      // eslint-disable-next-line jsx-a11y/html-has-lang
      <Html lang="pt-br">
        <CustomHead nonce={nonce}>
          {fontsList?.map((name, index) => (
            <Fragment key={index}>
              {fonts[name]?.map((item, index2) => (
                <link
                  key={index2}
                  rel="preload"
                  href={`/fonts/${item.src}`}
                  as="font"
                  crossOrigin="anonymous"
                />
              ))}
            </Fragment>
          ))}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#ff3355"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <HeadLinks />
          <HeadScripts nonce={nonce} />
        </CustomHead>
        <body>
          <BodyScripts />
          <div id="modal-root" />
          <Main />
          <CustomNextScript nonce={nonce} />
        </body>
      </Html>
    )
  }
}
export default CustomDocument
