import { Derived, Store } from 'aptechka/store'

export interface BasketStoreItem {
  name: string
  pid: string
  amount: number
  price: number
  image: string
  description?: string | undefined | false
}

export type OrderStoreType = 'delivery' | 'pickup'

export type OrderStoreState = {
  type: OrderStoreType
}

function createOrderStore() {
  const store = new Store<OrderStoreState>({ type: 'delivery' })

  function setType(value: OrderStoreType) {
    store.current = { ...store.current, type: value }
  }

  return {
    setType,

    subscribe: store.subscribe.bind(store),

    unsubscribe: store.unsubscribe.bind(store),

    get type() {
      return store.current.type
    },
  }
}

export const orderStore = createOrderStore()
