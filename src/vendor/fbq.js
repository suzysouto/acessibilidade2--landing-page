// https://developers.google.com/analytics/devguides/collection/gtagjs/pages

export const pageview = () => {
  // try-catch avoid page load delays
  try {
    window.fbq('track', 'PageView')
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
}

export const track = ({ event, ...params }) => {
  // try-catch avoid page load delays
  try {
    window.fbq('track', event, { ...params })
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
}

export const trackSingle = ({ event, pixelId, ...params }) => {
  // try-catch avoid page load delays
  try {
    window.fbq('trackSingle', pixelId, event, { ...params })
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
}
