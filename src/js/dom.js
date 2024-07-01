import {Page, Project, Todo} from './logic'
import {format, parseISO} from 'date-fns';

class PageDom {
  static refresh() {
    TodoList.refresh()   
    ProjectList.refresh()
  }
}

class ProjectList {
  static #projectInput = document.querySelector('[data-project-input]')
  static #projectList = document.querySelector('[data-project-list]')
  static #projectName = document.querySelector('[data-project-name]')

  static highlightCurrent() {
    this.#projectName.innerText = Page.currentProject

    const projects = document.querySelectorAll('[data-project]')

    for (const project of projects) {
      if (project.dataset.project === Page.currentProject) {
        project.classList.add('project-nav__item--select')
      } else {
        project.classList.remove('project-nav__item--select')
      }
    }
  }


  static #generateElement(projectName) {
    const template = `
      <div data-project='${projectName}' class="project-nav__item">
        <div class="project-nav__text">${projectName}</div>
        <div data-remove-project class="project-nav__close"></div>
      </div>
    `
    const div = document.createElement('div')
    div.innerHTML = template

    const project = div.querySelector('[data-project]')
    const removeProject = div.querySelector('[data-remove-project]')

    removeProject.addEventListener('click', (e) => {
      e.stopPropagation()
      this.remove(projectName)
    }) 

    project.addEventListener('click', () => {
      Page.setCurrentProject(projectName)
      PageDom.refresh()
    })

    return div
  }

  static refresh() {
    this.#projectList.innerHTML = ''
    for (const project of Project.projects) {
      if (project === 'Home') continue 

      const element = this.#generateElement(project)
      this.#projectList.insertAdjacentElement('afterbegin', element)
    }

    ProjectList.highlightCurrent()
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

    if (projectName === Page.currentProject) {
      Page.currentProject = 'Home'
      PageDom.refresh()
    } else {
      this.refresh()
    }
  }

  static handleSubmit(e) {
    e.preventDefault()

    const value = this.#projectInput.value
    this.#projectInput.value = ''

    this.add(value)
  }
}

class TodoList {
  static #todoForm = document.querySelector('[data-todo-form]')
  static #todoCards = document.querySelector('[data-todo-cards')

  static #generateElement(todo) {
    const template = `
      <div data-todo-name='${todo.title}' data-todos__card class="todos__card">
        <div data-delete-todo class="todos__delete-todo">&#x2716</div>
        <div class="todos__unexpanded">
          <div class="todos__title">${todo.title}</div>
          <div class="todos__priority">${todo.priority}</div>
          <div class="todos__due">${todo.dueDate}</div>
        </div>
        <div data-todos__expanded class="todos__expanded">${todo.description}</div>
      </div>
    `
    const div = document.createElement('div')
    div.innerHTML = template

    const expandable = div.querySelector('[data-todos__expanded]')
    const deleteButton = div.querySelector('[data-delete-todo]')
    
    div.addEventListener('click', () => {
      expandable.classList.toggle('todos__expanded--show')   
    })

    deleteButton.addEventListener('click', this.remove.bind(this, div))

    return div
  }

  static remove(element) {
    const card = element.querySelector('[data-todo-name]')

    Todo.remove(card.dataset.todoName, Page.currentProject)
    element.remove()
  }

  static refresh() {
    this.#todoCards.innerHTML = ''

    for (const todo of Todo.todos) {
      if (todo.project === Page.currentProject) {
        const element = this.#generateElement(todo)

        this.#todoCards.insertAdjacentElement('afterbegin', element)
      }
    }
  }

  static add(...values) {
    const dueDate = values[2]
    
    let formatedDueDate
    try {
      formatedDueDate = format(parseISO(dueDate), `MMM do, yyyy`)
    } catch (error) {
      alert(error.message)
      return
    }

    values[2] = formatedDueDate
    
    const todo = new Todo(...values)
    if (!Todo.isAddble(todo)) {
      alert('Another Todo already has this title on the project')
      return
    }

    Todo.add(todo)

    if (Page.currentProject === todo.project) this.refresh()
  }

  static handleSubmit(e) {
    e.preventDefault()
    const todoForm = new FormData(this.#todoForm)
    this.#todoForm.reset()

    const formValues = [
      todoForm.get('title'),
      todoForm.get('description'),
      todoForm.get('dueDate'),
      todoForm.get('priority'),
    ]

    this.add(...formValues, Page.currentProject)
  }
}

class Home {
  static #home = document.querySelector('[data-project="Home"]') 

  static setup() {
    this.#home.addEventListener('click', () => {
      Page.setCurrentProject('Home')
      PageDom.refresh()
    })
  }
}

export {ProjectList, TodoList, PageDom, Home}