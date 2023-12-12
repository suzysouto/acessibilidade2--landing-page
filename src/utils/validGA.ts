export const validGA = /UA-\d{4,10}-\d{1,4}/.test(
  process.env.NEXT_PUBLIC_GA_TRACKING_ID,
)
