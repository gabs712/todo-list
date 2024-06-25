const modal = document.querySelector('[data-modal]')
const openModal = document.querySelector('[data-open-modal]')
const closeModal = document.querySelector('[data-close-modal]')
const form = document.querySelector('[data-form]')

openModal.addEventListener('click', () => {
  modal.showModal()
})

closeModal.addEventListener('click', () => {
  modal.close()
})

form.addEventListener('submit', () => {
  modal.close()
})