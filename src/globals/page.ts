import { globalStore } from '@stores/globalStore'

function updateSize() {
  const clientWidth = document.documentElement.clientWidth

  document.documentElement.style.setProperty('--inner-height', innerHeight + 'px')

  document.documentElement.style.setProperty('--client-width', clientWidth + 'px')
}

addEventListener('load', () => {
  document.documentElement.classList.add('page-loaded')
  updateSize()
})

addEventListener('resize', updateSize)

globalStore.orderType.subscribe((e) => {
  document.documentElement.setAttribute('data-order-type', e.current)
})
