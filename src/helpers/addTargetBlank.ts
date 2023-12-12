function replacer(match: string) {
  return `${match} target="_blank" rel="noopener noreferrer nofollow"`
}

export const addTargetBlank = (html: string) => {
  if (html) {
    const externalLink = /<a[^>]*?href="[^>]*?"[^>]*/gi

    return html.replace(externalLink, replacer)
  } else return ''
}
