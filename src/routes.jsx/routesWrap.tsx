import { createBrowserRouter} from "react-router"
import { Home } from "../page/home"
import { About } from "../page/about"
import { Resume } from "../page/resume"
import { Projects } from "../page/project"
import { Settings } from "../page/settings"

const Routes = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/resume',
    element:<Resume/>
  },
  {
    path:'/projects',
    element:<Projects/>
  },
  {
    path:'/settings',
    element:<Settings/>
  }
])

export default Routes