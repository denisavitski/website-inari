import type { MenuItem } from '@blocks/Menu.astro'
import { chunkArray, shuffleArray } from '@utils/array'

export const menuItems: Array<MenuItem> = []

const categories = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5',
  'Category 6',
  'Category 7',
]

const subcategories = [
  'Subcategory 1',
  'Subcategory 2',
  'Subcategory 3',
  'Subcategory 4',
  'Subcategory 5',
]

const labels = [
  { value: 'Новинка', color: '#1A8704' },
  { value: 'Акция 10%', color: '#E53935' },
]

const defaultItemsLength = 50

for (let index = 0; index < defaultItemsLength; index++) {
  const price1 = 100 + Math.floor(Math.random() * 1000)
  const price2 = price1 + 500
  const size1 = Math.floor(Math.random() * 300)
  const size2 = size1 + 300

  const menuItem: MenuItem = {
    amount: 0,
    categories: chunkArray(
      shuffleArray(categories),
      Math.floor(1 + Math.random() * categories.length),
    )[0]!,
    description: `Description-${index}`,
    icon: index % 2 === 0 ? 'eco' : index % 3 === 0 ? 'spicy' : undefined,
    image: `/images/food/${1 + (index % 3)}.jpg`,
    info: {
      title: 'Вес',
      value: size1 + 'г',
      variants: [
        {
          shortName: '4 шт.',
          name: `Name-${index} 4 шт.`,
          pid: `${index}-1`,
          price: price1.toString(),
          size: size1 + ' г',
        },
        {
          shortName: '8 шт.',
          name: `Name-${index} 8 шт.`,
          pid: `${index}-2`,
          price: price2.toString(),
          size: size2 + ' г',
        },
      ],
    },
    labels:
      index % 2 === 0
        ? [labels[0]!]
        : index % 3 === 0
          ? [labels[1]!]
          : index % 4 === 0
            ? [labels[0]!, labels[1]!]
            : index % 5 === 0
              ? []
              : [],
    name: `Name-${index}`,
    pid: `${index}-1`,
    price: price1,
    subcategories: chunkArray(
      shuffleArray(subcategories),
      Math.floor(1 + Math.random() * subcategories.length),
    )[0]!,
    type: 'large',
  }

  menuItems.push(menuItem)
}
