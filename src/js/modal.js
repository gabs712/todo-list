const modal = document.querySelector('[data-modal]')
const openModal = document.querySelector('[data-open-modal]')
openModal.addEventListener('click', () => {
  modal.showModal()
})

const closeModal = document.querySelector('[data-close-modal]')
closeModal.addEventListener('click', () => {
  modal.close()
})

const form = document.querySelector('[data-todo-form]')
form.addEventListener('submit', () => {
  modal.close()
})
