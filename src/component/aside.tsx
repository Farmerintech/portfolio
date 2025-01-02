import { useContext } from "react"
import { MenuIcons } from "./menu"
import { ThemeContext } from "../context/themeContext"
import { imageIcons } from "./icons"
import { Link } from "react-router"


export const Main = () =>{
    const {Theme} = useContext(ThemeContext)
    return(
        <main className={`${Theme === 'light' ? "bg-white text-black" : "bg-gray-700 text-white"} 
        flex justify-start fixed top-10 w-full`}>
            <MenuIcons/>
            
        </main>
    )
}