export function beautifyNumber(number: string | number) {
  const rounded = Math.ceil(+number)
  const stringNumber = rounded.toString()

  const trimmed = stringNumber.trim()

  let result = ''

  if (trimmed.length === 4) {
    result = `${trimmed.slice(0, 1)} ${trimmed.slice(1)}`
  } else if (trimmed.length === 5) {
    result = `${trimmed.slice(0, 2)} ${trimmed.slice(2)}`
  } else if (trimmed.length === 6) {
    result = `${trimmed.slice(0, 3)} ${trimmed.slice(3)}`
  } else if (trimmed.length === 7) {
    result = `${trimmed.slice(0, 1)} ${trimmed.slice(1, 4)} ${trimmed.slice(4)}`
  } else if (trimmed.length === 8) {
    result = `${trimmed.slice(0, 2)} ${trimmed.slice(2, 5)} ${trimmed.slice(5)}`
  } else if (trimmed.length === 9) {
    result = `${trimmed.slice(0, 3)} ${trimmed.slice(3, 6)} ${trimmed.slice(6)}`
  } else {
    result = trimmed
  }

  return result
}

export function numberToPrice(number: string | number) {
  return beautifyNumber(number) + ' ₽'
}
