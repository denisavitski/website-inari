export interface BasketStoreItem {
  name: string
  pid: string
  amount: number
  price: number
  image: string
  description?: string | undefined | false
}

export type BasketStoreState = Array<BasketStoreItem>

export interface ProductVariant {
  shortName: string
  name: string
  size: string
  price: string | number
  oldPrice?: string | number | undefined
}
