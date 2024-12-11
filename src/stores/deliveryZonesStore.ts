import { Store } from 'aptechka/store'

export interface DeliveryZone {
  name: string
  description: string
  addition?: string
  free: number
  price: number
}

function createDeliveryZoneStore() {
  let list: Array<DeliveryZone> = []

  const userZone = new Store<DeliveryZone | null>(null)

  function addZone(parameters: DeliveryZone) {
    if (!list.find((v) => v.name === parameters.name)) {
      list.push(parameters)
    }
  }

  function removeZone(name: string) {
    list = list.filter((zone) => zone.name !== name)
  }

  function setUserZone(name?: string | null | undefined) {
    userZone.current = list.find((zone) => zone.name === name) || null
  }

  function findZone(name: string) {
    return list.find((zone) => zone.name === name)
  }

  return {
    addZone,
    removeZone,
    setUserZone,
    findZone,

    subscribe: userZone.subscribe.bind(userZone),
    unsubscribe: userZone.unsubscribe.bind(userZone),

    get list() {
      return JSON.parse(JSON.stringify(list)) as Array<DeliveryZone>
    },

    get userZone() {
      return userZone.current
    },
  }
}

export const deliveryZonesStore = createDeliveryZoneStore()
