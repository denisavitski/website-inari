import { Derived, Store } from 'aptechka/store'

export interface BasketStoreItem {
  name: string
  pid: string
  amount: number
  price: number
  image: string
  description?: string | undefined
}

export type BasketStoreState = Array<BasketStoreItem>

function createBaksetStore() {
  const store = new Store<BasketStoreState>([])

  const derived = new Derived(store, (value) => {
    const fullPrice = value.reduce((p, c) => {
      return p + c.price * c.amount
    }, 0)

    const fullAmount = value.reduce((p, c) => {
      return p + c.amount
    }, 0)

    return {
      fullPrice,
      fullAmount,
    }
  })

  function setItem(parameters: BasketStoreItem) {
    let item = store.current.find((v) => v.pid === parameters.pid)

    if (!item) {
      if (parameters.amount) {
        item = {
          ...parameters,
        }

        store.current = [...store.current, item]
      }
    } else {
      if (parameters.amount) {
        item.amount = parameters.amount
        store.current = [...store.current]
      } else {
        store.current = store.current.filter((v) => v.pid !== parameters.pid)
      }
    }
  }

  function updateItem(pid: string, amount: number) {
    const item = store.current.find((v) => v.pid === pid)

    if (item && item.amount !== amount) {
      item.amount = amount
      store.current = [...store.current]
    }
  }

  function removeItem(pid: string) {
    store.current = store.current.filter((v) => v.pid !== pid)
  }

  return {
    setItem,

    removeItem,

    updateItem,

    subscribe: derived.subscribe.bind(derived),

    unsubscribe: derived.unsubscribe.bind(derived),

    get items() {
      return store.current
    },

    get fullPrice() {
      return derived.current.fullPrice
    },

    get fullAmount() {
      return derived.current.fullAmount
    },
  }
}

export const basketStore = createBaksetStore()
