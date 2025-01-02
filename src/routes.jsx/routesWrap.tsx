import { createBrowserRouter} from "react-router"
import { Home } from "../page/home"
import { About } from "../page/about"

const Routes = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/about',
    element:<About/>
  }
])

export default Routes