import { dispatchEvent } from 'aptechka/utils'

export interface InputGroupEvents {
  inputGroupValueChange: CustomEvent<string | undefined>
}

export class InputGroupElement<T extends string = string> extends HTMLElement {
  #inputElements: Array<HTMLInputElement> = []

  #value: T | undefined
  #input: HTMLInputElement | null = null
  #name: string = ''

  public get value() {
    return this.#value
  }

  public get input() {
    return this.#input
  }

  public get name() {
    return this.#name
  }

  public changeValue(value: string) {
    const input = this.#inputElements.find((input) => input.value === value)

    if (input && input.value !== this.#value) {
      input.checked = true
      this.#updateValue()
    }
  }

  protected connectedCallback() {
    this.#inputElements = [...this.querySelectorAll<HTMLInputElement>('input')]

    if (this.hasAttribute('name')) {
      this.#name = this.getAttribute('name')!
    } else {
      this.#name = this.#inputElements[0]?.name || ''
    }

    this.#inputElements.forEach((element) => {
      element.name = this.#name
    })

    this.#updateValue()

    this.#inputElements.forEach((input) => {
      input.addEventListener('change', this.#inputListener)
    })
  }

  protected disconnectedCallback() {
    this.#inputElements.forEach((input) => {
      input.removeEventListener('change', this.#inputListener)
    })
  }

  #inputListener = () => {
    this.#updateValue()

    dispatchEvent(this, 'inputGroupValueChange', {
      custom: true,
      detail: this.#value,
    })
  }

  #updateValue() {
    const input = this.#inputElements.find((input) => input.checked)

    if (input) {
      this.#input = input
      this.#value = input.value.trim() as T
    } else {
      this.#value = undefined
    }
  }
}

if (!customElements.get('e-input-group')) {
  customElements.define('e-input-group', InputGroupElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-input-group': InputGroupElement
  }

  interface HTMLElementEventMap extends InputGroupEvents {}
}
