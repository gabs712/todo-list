class Page {
  static currentProject

  static setCurrentProject(project) {
    Storage.setCurrentProject(project)
    this.currentProject = Storage.getCurrentProject()
  }
}

class Storage {
  static setCurrentProject(project) {
    localStorage.setItem('currentProject', project)
  }

  static getCurrentProject() {
    return localStorage.getItem('currentProject')
  }
  
  static #hasProperty(property) {
    return localStorage.getItem(property) !== null
  }

  static add(property, value) {
    if (!this.#hasProperty(property)) {
      localStorage.setItem(property, '[]')
    }

    const storageValues = JSON.parse(localStorage.getItem(property))
    storageValues.push(value)

    const stringfied = JSON.stringify(storageValues)
    localStorage.setItem(property, stringfied)
  }

  static get(property) {
    if (!this.#hasProperty(property)) return []
    return JSON.parse(localStorage.getItem(property))
  }
}

class Project {
  static projects = Storage.get('projects') 

  static isAddble(item) {
    if (this.projects.includes(item)) return false
    return true
  }

  static add(project) {
    Storage.add('projects', project)
    this.projects = Storage.get('projects')
  }

  static remove(item) {
    Todo.removeAllFromProject(item)

    for (const [i, project] of this.projects.entries()) {
      if (item === project) {
        this.projects.splice(i, 1)
        return true
      }
    }
    return false
  }
}

class Todo {
  static todos = Storage.get('todos')

  constructor(title, description, dueDate, priority, project) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.project = project
  }

  static #projectExists(obj) {
    return Project.projects.includes(obj.project)    
  }
  
  static #fromSameProject(obj, todo) {
    return obj.project === todo.project   
  }

  static #hasSameTitle(obj, todo) {
    return obj.title === todo.title
  }

  static isAddble(obj) {
    if (!this.#projectExists(obj)) return false

    for (const todo of this.todos) {
      if (!(this.#fromSameProject(obj, todo))) continue
      if (this.#hasSameTitle(obj, todo)) return false
    }
    return true
  }

  static add(obj) {
    Storage.add('todos', obj)
    this.todos = Storage.get('todos')
  }

  static removeAllFromProject(project) {
    this.todos = this.todos.filter((todo) => todo.project !== project) 
  }

  static remove(title, project) {
    this.todos = this.todos.filter((todo) => todo.title !== title && todo.project !== project)
  }
}

export {Page, Project, Todo, Storage  }
