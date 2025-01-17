export interface BasketStoreItem {
  name: string
  pid: string
  amount: number
  price: number
  image: string
  description?: string | undefined | false
  href: string
}

export type BasketStoreState = Array<BasketStoreItem>

export interface ProductVariant {
  name: string
}
