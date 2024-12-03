export function validateEmail(value: string) {
  var input = document.createElement('input')

  input.type = 'email'
  input.required = true
  input.value = value

  return typeof input.checkValidity === 'function'
    ? input.checkValidity()
    : /\S+@\S+\.\S+/.test(value)
}
