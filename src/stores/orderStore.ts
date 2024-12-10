import { Store } from 'aptechka/store'
import { basketStore } from './basketStore'

export type OrderStoreType = 'delivery' | 'pickup'
export type OrderStoreStep = 'basket' | 'order' | 'complete'

export type OrderStoreState = {
  type: OrderStoreType
  discount: number
  deliveryPrice: number
  address: string
  finalPrice: number
  step: OrderStoreStep
}

function createOrderStore() {
  const store = new Store<OrderStoreState>({
    type: 'delivery',
    discount: 0,
    deliveryPrice: 0,
    address: '',
    finalPrice: 0,
    step: 'basket',
  })

  function getFinalPrice(s: OrderStoreState) {
    return Math.max(0, basketStore.fullPrice + s.deliveryPrice - s.discount)
  }

  store.addMiddleware((e) => {
    return {
      ...e,
      finalPrice: getFinalPrice(e),
    }
  })

  basketStore.subscribe(() => {
    store.current = {
      ...store.current,
    }
  })

  function setType(value: OrderStoreType) {
    if (value !== 'delivery' && value !== 'pickup') {
      console.error(
        `[orderStore.setType]: Значение ${value} не было установлено. Разрешены значения только типа 'delivery' | 'pickup'`,
      )
      return
    }

    store.current = { ...store.current, type: value, address: '' }
  }

  function setDiscount(value: number) {
    store.current = { ...store.current, discount: value }
  }

  function setDeliveryPrice(value: number) {
    store.current = { ...store.current, deliveryPrice: value }
  }

  function setAddress(value: string) {
    store.current = { ...store.current, address: value }
  }

  function setStep(value: OrderStoreStep) {
    store.current = { ...store.current, step: value }
  }

  return {
    setType,
    setDiscount,
    setDeliveryPrice,
    setAddress,
    setStep,

    subscribe: store.subscribe.bind(store),
    unsubscribe: store.unsubscribe.bind(store),

    get type() {
      return store.current.type
    },

    get discount() {
      return store.current.discount
    },

    get deliveryPrice() {
      return store.current.deliveryPrice
    },

    get finalPrice() {
      return store.current.finalPrice
    },

    get address() {
      return store.current.address
    },

    get step() {
      return store.current.step
    },
  }
}

export const orderStore = createOrderStore()
