import { Composed, Store } from 'aptechka/store'

export interface DeliveryZone {
  name: string
  description: string
  addition?: string
  free: number
  price: number
}

export type OrderType = 'delivery' | 'pickup'

export type OrderStep = 'basket' | 'order' | 'complete'

export type Promocode = { name: string; discount: number }

function createGlobalStore() {
  // Delivery Zones

  let deliveryZones: Array<DeliveryZone> = []

  const userDeliveryZoneStore = new Store<DeliveryZone | null>(null)

  const delivery = {
    addZone(parameters: DeliveryZone) {
      if (!deliveryZones.find((v) => v.name === parameters.name)) {
        deliveryZones.push(parameters)
      }
    },

    removeZone(name: string) {
      deliveryZones = deliveryZones.filter((zone) => zone.name !== name)
    },

    findZone(name: string) {
      return deliveryZones.find((zone) => zone.name === name)
    },

    setUserZone(name?: string | null | undefined) {
      userDeliveryZoneStore.current = deliveryZones.find((zone) => zone.name === name) || null
    },

    subscribe: userDeliveryZoneStore.subscribe.bind(userDeliveryZoneStore),
    unsubscribe: userDeliveryZoneStore.unsubscribe.bind(userDeliveryZoneStore),

    get allZones() {
      return JSON.parse(JSON.stringify(deliveryZones)) as Array<DeliveryZone>
    },

    get userZone() {
      return userDeliveryZoneStore.current
    },
  }

  // User address

  const userAddressStore = new Store<string>('')

  const address = {
    subscribe: userAddressStore.subscribe.bind(userAddressStore),
    unsubscribe: userAddressStore.unsubscribe.bind(userAddressStore),

    set value(name: string) {
      userAddressStore.current = name
    },

    get value() {
      return userAddressStore.current
    },
  }

  // Order type

  const orderTypeStore = new Store<OrderType>('delivery')

  const orderType = {
    subscribe: orderTypeStore.subscribe.bind(orderTypeStore),
    unsubscribe: orderTypeStore.unsubscribe.bind(orderTypeStore),

    set value(name: OrderType) {
      orderTypeStore.current = name
    },

    get value() {
      return orderTypeStore.current
    },
  }

  // Products amount

  const productsNumberStore = new Store<number>(0)

  const productsNumber = {
    subscribe: productsNumberStore.subscribe.bind(productsNumberStore),
    unsubscribe: productsNumberStore.unsubscribe.bind(productsNumberStore),

    set value(value: number) {
      productsNumberStore.current = value
    },

    get value() {
      return productsNumberStore.current
    },
  }

  // Order steps

  const orderStepStore = new Store<OrderStep>('basket')

  const orderStep = {
    subscribe: orderStepStore.subscribe.bind(orderStepStore),
    unsubscribe: orderStepStore.unsubscribe.bind(orderStepStore),

    set value(value: OrderStep) {
      orderStepStore.current = value
    },

    get value() {
      return orderStepStore.current
    },
  }

  // Promocode

  const promocodeStore = new Store<Promocode | null>(null)

  const promocode = {
    subscribe: promocodeStore.subscribe.bind(promocodeStore),
    unsubscribe: promocodeStore.unsubscribe.bind(promocodeStore),

    set value(value: Promocode | null) {
      promocodeStore.current = value
    },

    get value() {
      return promocodeStore.current
    },
  }

  // Delivery price

  const deliveryPriceStore = new Store<number>(0)

  const deliveryPrice = {
    subscribe: deliveryPriceStore.subscribe.bind(deliveryPriceStore),
    unsubscribe: deliveryPriceStore.unsubscribe.bind(deliveryPriceStore),

    set value(value: number) {
      deliveryPriceStore.current = value
    },

    get value() {
      return deliveryPriceStore.current
    },
  }

  // Products price

  const productsPriceStore = new Store<number>(0)

  const productsPrice = {
    subscribe: productsPriceStore.subscribe.bind(productsPriceStore),
    unsubscribe: productsPriceStore.unsubscribe.bind(productsPriceStore),

    set value(value: number) {
      productsPriceStore.current = value
    },

    get value() {
      return productsPriceStore.current
    },
  }

  // Products price

  const finalPriceStore = new Store<number>(0)

  const finalPrice = {
    subscribe: finalPriceStore.subscribe.bind(finalPriceStore),
    unsubscribe: finalPriceStore.unsubscribe.bind(finalPriceStore),

    set value(value: number) {
      finalPriceStore.current = value
    },

    get value() {
      return finalPriceStore.current
    },
  }

  // all

  let allCounter = 0

  const allStore = new Composed(
    [
      userDeliveryZoneStore,
      userAddressStore,
      orderTypeStore,
      productsNumberStore,
      promocodeStore,
      orderStepStore,
      deliveryPriceStore,
      productsPriceStore,
      finalPriceStore,
    ],
    () => allCounter++,
  )

  const all = {
    subscribe: allStore.subscribe.bind(allStore),
    unsubscribe: allStore.unsubscribe.bind(allStore),
  }

  const res = {
    delivery,
    address,
    orderType,
    productsNumber,
    orderStep,
    promocode,
    deliveryPrice,
    productsPrice,
    finalPrice,
    all,
  }

  return res
}

export const globalStore = (window.globalStore = createGlobalStore())

declare global {
  interface Window {
    globalStore: ReturnType<typeof createGlobalStore>
  }
}
