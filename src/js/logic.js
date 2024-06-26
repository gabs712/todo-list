class Project {
  static projects = []

  static isAddble(item) {
    if (!this.projects.includes(item)) return false
    return true
  }

  static addProject(todo) {
    this.projects.push(todo)
  }

  static deleteProject(item) {
    for (const [i, project] of this.projects.entries()) {
      if (item === project) {
        this.projects.splice(i, 1)
      }
    }
    alert('Something went wrong when trying to delete')
  }
}


class Todo {
  static todos = []

  constructor(title, description, due, priority, project) {
    this.title = title
    this.description = description
    this.due = due
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
    obj.title === todo.title
  }

  static isAddble(obj) {
    if (!this.#projectExists(obj)) return false

    for (const todo of this.todos) {
      if (!(this.#fromSameProject(obj, todo))) continue
      if (this.#hasSameTitle(obj, todo)) return false
    }
    return true
  }

  static addTodo(obj) {
    this.todos.push(obj)
  }

  static deleteTodo(title, project) {
    for (const [i, todo] of this.todos.entries()) {
      if (todo.title === title && todo.project === project) {
        todo.splice(i, 1)
        return
      }
    }
    alert('Something went wrong when trying to delete')
  }
}