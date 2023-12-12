export const scripts = {
  eager: [
    process.env.NEXT_PUBLIC_GA_TRACKING_ID
      ? `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`
      : '',
  ],
  lazy: [
    // 'https://player.vimeo.com/api/player.js'
  ],
}

export const HeadScripts = ({ nonce }) => (
  <>
    {process.env.NEXT_PUBLIC_GA_TRACKING_ID ? (
      <script
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `(function(w,l){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});})(window,'dataLayer');`,
        }}
      />
    ) : null}
  </>
)

export const BodyScripts = () => (
  <>
    {process.env.NEXT_PUBLIC_GA_TRACKING_ID ? (
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    ) : null}
  </>
)
