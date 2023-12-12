export const cpfTest = (cpf: string | number) => {
  cpf = cpf.toString().replace(/\D+/gi, '')
  if (!cpf || cpf.length < 11 || cpf === '00000000000') return false
  let sum = 0
  let left
  for (let i = 11; i < 13; i++) {
    for (let j = 1; j < i - 1; j++)
      sum = sum + parseInt(cpf.substring(j - 1, j)) * (i - j)
    left = (sum * 10) % 11
    if (left === 10 || left === 11) left = 0
    if (left !== parseInt(cpf.substring(i - 2, i - 1))) return false
    sum = 0
  }
  return true
}
