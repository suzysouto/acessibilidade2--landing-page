export const getCookie = (name: string, jar: string) => {
  if (!jar) return
  const value = `; ${jar}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
