import {Project, Page, Storage} from './logic'
import {PageDom, Home} from './dom'

Home.setup()

if (localStorage.length === 0) {
  Project.add('Home')
  Page.setCurrentProject('Home')
}

Page.setCurrentProject(Storage.getCurrentProject())
PageDom.refresh()