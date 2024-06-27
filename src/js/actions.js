import {ProjectList, TodoList} from './dom'

const projectForm = document.querySelector('[data-project-form]')
const todoForm = document.querySelector('[data-todo-form]')

projectForm.addEventListener('submit', ProjectList.handleSubmit.bind(ProjectList))
todoForm.addEventListener('submit', TodoList.handleSubmit.bind(TodoList))