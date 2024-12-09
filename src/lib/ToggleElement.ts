import { dispatchEvent } from 'aptechka/utils'

export interface ToggleEvents {
  toggleChange: CustomEvent<string | undefined>
}

export class ToggleElement<T extends string = string> extends HTMLElement {
  #buttonElements: Array<HTMLElement> = []
  #allToggleElements: Array<ToggleElement> = []
  #value: T | undefined
  #currentButtonElement: HTMLElement | null = null

  public get value() {
    return this.#value
  }

  public get name() {
    return this.getAttribute('name')
  }

  public get buttonElement() {
    return this.#currentButtonElement
  }

  public setValue(value: T | undefined, _notifyRest = false) {
    if (value && value !== this.#value) {
      this.#value = value

      this.#buttonElements.forEach((element) => {
        if (element.getAttribute('data-value') === this.#value) {
          element.setAttribute('data-checked', '')
          this.#currentButtonElement = element
        } else {
          element.removeAttribute('data-checked')
        }
      })

      dispatchEvent(this, 'toggleChange', {
        detail: this.#value,
      })

      if (_notifyRest) {
        this.#allToggleElements.forEach((element) => {
          if (element !== this) {
            element.setValue(value)
          }
        })
      }
    }
  }

  protected connectedCallback() {
    this.#buttonElements = [...this.querySelectorAll<HTMLElement>('button')]

    if (document.readyState === 'complete') {
      this.#loadListener()
    } else {
      addEventListener('load', this.#loadListener)
    }
  }

  protected disconnectedCallback() {
    this.#buttonElements.forEach((element) => {
      element.removeEventListener('click', this.#buttonClickListener)
    })

    removeEventListener('load', this.#loadListener)
  }

  #loadListener = () => {
    if (this.isConnected) {
      this.#buttonElements.forEach((element) => {
        element.addEventListener('click', this.#buttonClickListener)

        if (element.hasAttribute('data-checked')) {
          this.setValue(element.getAttribute('data-value') as T, true)
        }
      })

      this.#allToggleElements = [
        ...document.querySelectorAll<ToggleElement>(`[name="${this.name}"]`),
      ].filter((el) => el instanceof ToggleElement)
    }
  }

  #buttonClickListener = (e: Event) => {
    const ct = e.currentTarget as HTMLElement

    const value = ct.getAttribute('data-value')

    if (value) {
      this.setValue(value as T, true)
    }
  }
}

if (!customElements.get('e-toggle')) {
  customElements.define('e-toggle', ToggleElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-toggle': ToggleElement
  }

  interface HTMLElementEventMap extends ToggleEvents {}
}
