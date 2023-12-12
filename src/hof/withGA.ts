import { NextWebVitalsMetric } from 'next/app'

import { validGA } from 'utils'
import * as gtag from 'vendor/gtag'

export const withGA =
  (fn?: ({ ...props }: NextWebVitalsMetric) => void) =>
  (metric: NextWebVitalsMetric) => {
    if (!validGA || process.env.NODE_ENV !== 'production') return
    const { label, name, value, id } = metric
    gtag.event({
      action: name,
      category: `Next.js - ${label} - Web Vitals`,
      label: id, // id unique to current page load
      value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    })
    if (fn) fn(metric)
  }
