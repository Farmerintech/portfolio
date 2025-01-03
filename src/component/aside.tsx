import { useContext } from "react"
import { MenuIcons } from "./menu"
import { ThemeContext } from "../context/themeContext"


export const Aside = () =>{
    const {Theme} = useContext(ThemeContext)
    return(
        <main className={`${Theme === 'light' ? "bg-stone-50 text-black" : "bg-gray-700 text-white"} 
        flex justify-start fixed top-10 w-full`}>
            <MenuIcons/>
            
        </main>
    )
}