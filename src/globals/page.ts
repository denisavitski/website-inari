import { basketStore } from '@stores/basketStore'
import { orderStore } from '@stores/orderStore'
import { Morph } from 'aptechka/morph'

export const morph = new Morph({
  trailingSlash: true,
  scrollSelector: '#page-scroll',
})

function updateSize() {
  const clientWidth = document.documentElement.clientWidth

  document.documentElement.style.setProperty('--inner-height', innerHeight + 'px')

  document.documentElement.style.setProperty('--client-width', clientWidth + 'px')
}

function scrollListener() {
  if (morph.scrollElement.scrollTop > 0) {
    document.documentElement.classList.add('scrolled')
  } else {
    document.documentElement.classList.remove('scrolled')
  }
}

document.addEventListener('morphStart', () => {
  morph.scrollElement.removeEventListener('scroll', scrollListener)
})

document.addEventListener('morphComplete', () => {
  morph.scrollElement.addEventListener('scroll', scrollListener)
})

addEventListener('load', () => {
  document.documentElement.classList.add('page-loaded')
  updateSize()
})

addEventListener('resize', updateSize)

orderStore.subscribe((e) => {
  document.documentElement.setAttribute('data-order-type', e.current.type)
})

basketStore.subscribe(() => {
  document.documentElement.setAttribute(
    'data-basket-has-items',
    (!!basketStore.items.length).toString(),
  )
})
