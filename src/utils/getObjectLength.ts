export const getObjectLength = (obj: { [k: string]: any }) => {
  let total = 0
  Object.values(obj)
    .flat()
    .map(() => ++total)
  return total
}
