import { createBrowserRouter} from "react-router"
import { Home } from "../page/home"
import { About } from "../page/about"
import { Resume } from "../page/resume"
import { Projects } from "../page/project"

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
  }
])

export default Routes