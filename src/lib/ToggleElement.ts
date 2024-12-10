import { dispatchEvent } from 'aptechka/utils'

export interface ToggleEvents {
  toggleChange: CustomEvent<string | undefined>
}

export class ToggleElement<T extends string = string> extends HTMLElement {
  #buttonElements: Array<HTMLElement> = []
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
        bubbles: true,
      })
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

    document.documentElement.removeEventListener('toggleChange', this.#documentToggleChangeListener)
  }

  #loadListener = () => {
    if (this.isConnected) {
      document.documentElement.addEventListener('toggleChange', this.#documentToggleChangeListener)

      this.#buttonElements.forEach((element) => {
        element.addEventListener('click', this.#buttonClickListener)

        if (element.hasAttribute('data-checked')) {
          this.setValue(element.getAttribute('data-value') as T, true)
        }
      })
    }
  }

  #buttonClickListener = (e: Event) => {
    const ct = e.currentTarget as HTMLElement

    const value = ct.getAttribute('data-value')

    if (value) {
      this.setValue(value as T, true)
    }
  }

  #documentToggleChangeListener = (event: ToggleEvents['toggleChange']) => {
    const ct = event.target as ToggleElement

    if (ct !== this && ct.name === this.name) {
      this.setValue(event.detail as T)
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
