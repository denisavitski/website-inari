export function declension(number: number | string, one: string, few: string, many: string) {
  const n = typeof number === 'string' ? parseInt(number) : number

  if (n === 1) {
    return one
  }

  if (n % 100 >= 11 && n % 100 <= 14) {
    return many
  }

  const remainder = n % 10

  if (remainder === 1) {
    return one
  }

  if (remainder >= 2 && remainder <= 4) {
    return few
  }

  return many
}

export function productsToString(number: number | string) {
  return declension(number, 'товар', 'товара', 'товаров')
}
