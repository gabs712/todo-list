class Page {
  static currentProject

  static setCurrentProject(project) {
    this.currentProject = project
  }
}

class Project {
  static projects = []

  static isAddble(item) {
    if (this.projects.includes(item)) return false
    return true
  }

  static add(todo) {
    this.projects.push(todo)
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
  static todos = []

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
    this.todos.push(obj)
  }

  static removeAllFromProject(project) {
    this.todos = this.todos.filter((todo) => todo.project !== project) 
  }

  static remove(title, project) {
    this.todos = this.todos.filter((todo) => todo.title !== title && todo.project !== project)
  }
}

export {Page, Project, Todo}
