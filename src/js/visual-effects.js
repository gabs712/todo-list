const modal = document.querySelector('[data-modal]')
const openModal = document.querySelector('[data-open-modal]')
openModal.addEventListener('click', () => {
  modal.showModal()
})

const closeModal = document.querySelector('[data-close-modal]')
closeModal.addEventListener('click', () => {
  modal.close()
})

const form = document.querySelector('[data-form]')
form.addEventListener('submit', () => {
  modal.close()
})

const expandableCards = document.querySelectorAll('[data-todos__expanded]')
for (const expandableCard of expandableCards) {
  expandableCard.closest('[data-todos__card]').addEventListener('click', () => {
    expandableCard.classList.toggle('todos__expanded--show')   
  })
}