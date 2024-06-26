import {ProjectList} from './dom'

const projectForm = document.querySelector('[data-project-form]')

projectForm.addEventListener('submit', ProjectList.handleInputSubmit.bind(ProjectList))
