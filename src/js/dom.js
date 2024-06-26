import {Project, Todo} from './logic'

class ProjectList {
  static #projectInput = document.querySelector('[data-project-input]')
  static #projectList = document.querySelector('[data-project-list]')

  static #generateElement(projectName) {
    const template = `
      <div data-project class="project-nav__item">
        <div class="project-nav__text">${projectName}</div>
        <div data-remove-project class="project-nav__close"></div>
      </div>
    `
    let div = document.createElement('div')
    div.innerHTML = template
    div = div.firstElementChild   

    const project = div.querySelector('[data-project]')
    const removeProject = div.querySelector('[data-remove-project]')

    removeProject.addEventListener('click', this.remove.bind(this, projectName))

    return div
  }

  static refresh() {
    this.#projectList.innerHTML = ''
    
    for (const project of Project.projects) {
      // Omit default projects (i.e Home)
      if (typeof project === 'symbol') continue

      const element = this.#generateElement(project)
      this.#projectList.insertAdjacentElement('afterbegin', element)
    }
  }

  static add(projectName) {
    if (!Project.isAddble(projectName)) {
      alert('The project already exists')
      return
    }

    Project.add(projectName)

    this.refresh()
  }

  static remove(projectName) {
    Project.remove(projectName)
    this.refresh()
  }

  static handleInputSubmit(e) {
    e.preventDefault()

    const value = this.#projectInput.value
    this.#projectInput.value = ''

    this.add(value)
  }

}

export {ProjectList}