import { createBrowserRouter} from "react-router"
import { Home } from "../page/home"
import { About } from "../page/about"
import { Resume } from "../page/resume"

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
  }
])

export default Routes