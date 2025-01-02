import { createBrowserRouter} from "react-router"
import { Home } from "../page/home"

const Routes = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  }
])

export default Routes