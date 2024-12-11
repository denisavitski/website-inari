import { Derived, Store } from 'aptechka/store'
import { basketStore } from './basketStore'
import { deliveryZonesStore } from './deliveryZonesStore'

export type OrderStoreType = 'delivery' | 'pickup'
export type OrderStoreStep = 'basket' | 'order' | 'complete'

export type OrderStoreState = {
  type: OrderStoreType
  discount: number
  deliveryPrice: number
  address: string
  finalPrice: number
  step: OrderStoreStep
  promocode: string
}

function createOrderStore() {
  const store = new Store<OrderStoreState>({
    type: 'delivery',
    discount: 0,
    deliveryPrice: 0,
    address: '',
    finalPrice: 0,
    step: 'basket',
    promocode: '',
  })

  const typeStore = new Derived(store, (v) => v.type)
  const addressStore = new Derived(store, (v) => v.address)

  function getFinalPrice(s: OrderStoreState) {
    return Math.max(0, basketStore.fullPrice + getDeliveryPrice() - s.discount)
  }

  function getDeliveryPrice() {
    let deliveryPrice = 0

    let productsPriceWithDiscount = basketStore.fullPrice - store.current.discount

    if (deliveryZonesStore.userZone) {
      if (productsPriceWithDiscount < deliveryZonesStore.userZone.free) {
        deliveryPrice = deliveryZonesStore.userZone.price
      }
    }

    return deliveryPrice
  }

  store.addMiddleware((e) => {
    return {
      ...e,
      deliveryPrice: getDeliveryPrice(),
      finalPrice: getFinalPrice(e),
    }
  })

  basketStore.subscribe(() => {
    store.current = {
      ...store.current,
    }
  })

  deliveryZonesStore.subscribe(() => {
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

    if (store.current.type === value) {
      return
    }

    store.current = { ...store.current, type: value, address: '' }
  }

  function setPromocode(name: string, value: number) {
    if (store.current.promocode === name) {
      return
    }

    store.current = { ...store.current, promocode: name, discount: value }
  }

  function setAddress(value: string) {
    if (store.current.address === value) {
      return
    }

    store.current = { ...store.current, address: value }
  }

  function setStep(value: OrderStoreStep) {
    if (store.current.step === value) {
      return
    }

    store.current = { ...store.current, step: value }
  }

  return {
    setType,
    setPromocode,
    setAddress,
    setStep,

    subscribe: store.subscribe.bind(store),
    unsubscribe: store.unsubscribe.bind(store),

    subscribeToType: typeStore.subscribe.bind(typeStore),
    unsubscribeFromType: typeStore.unsubscribe.bind(typeStore),

    subscribeToAddress: addressStore.subscribe.bind(addressStore),
    unsubscribeFromAddress: addressStore.unsubscribe.bind(addressStore),

    get type() {
      return typeStore.current
    },

    get discount() {
      return store.current.discount
    },

    get deliveryPrice() {
      return store.current.deliveryPrice
    },

    get promocode() {
      return store.current.promocode
    },

    get finalPrice() {
      return store.current.finalPrice
    },

    get address() {
      return addressStore.current
    },

    get step() {
      return store.current.step
    },
  }
}

export const orderStore = createOrderStore()
