import { Store } from 'aptechka/store'

export type OrderStoreType = 'delivery' | 'pickup'

export type OrderStoreState = {
  type: OrderStoreType
  discount: number
  address: string
}

function createOrderStore() {
  const store = new Store<OrderStoreState>({ type: 'delivery', discount: 0, address: '' })

  function setType(value: OrderStoreType) {
    if (value !== 'delivery' && value !== 'pickup') {
      console.error(
        `[orderStore.setType]: Значение ${value} не было установлено. Разрешены значения только типа 'delivery' | 'pickup'`,
      )
      return
    }

    store.current = { ...store.current, type: value }
  }

  function setDiscount(value: number) {
    store.current = { ...store.current, discount: value }
  }

  function setAddress(value: string) {
    store.current = { ...store.current, address: value }
  }

  return {
    setType,
    setDiscount,
    setAddress,

    subscribe: store.subscribe.bind(store),

    unsubscribe: store.unsubscribe.bind(store),

    get type() {
      return store.current.type
    },

    get discount() {
      return store.current.discount
    },

    get address() {
      return store.current.address
    },
  }
}

export const orderStore = createOrderStore()
