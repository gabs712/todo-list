import {Project, Page} from './logic'
import {PageDom, Home} from './dom'

Home.setup()

Project.projects.push('Home')
Page.setCurrentProject('Home')
PageDom.refresh()