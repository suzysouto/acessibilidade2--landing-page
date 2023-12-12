export const copyClipboard = (text: string) => {
  if (navigator.clipboard) navigator.clipboard.writeText(text)
  else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
    } catch (e) {
      console.error(e)
    }
    document.body.removeChild(textArea)
  }
}
