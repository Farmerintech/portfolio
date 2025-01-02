import { useContext } from "react"
import { BiGitBranch, BiNotification, BiX } from "react-icons/bi"
import { ThemeContext } from "../context/themeContext"
import { MdNotifications, MdOutlineNotifications } from "react-icons/md"

export const Footer = () =>{
    const {Theme} = useContext(ThemeContext)
    return(
        <section className={`${Theme === 'light' ? "bg-stone-50 text-black" : "bg-gray-800 text-white"} 
        fixed bottom-0 w-full z-20 `}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <BiGitBranch size={20}/>
                <span>main</span>
              </div>
              <div className="flex items-center justify-between gap-8">
                <p>{"{} TypeScript JSX"}</p>
                <MdOutlineNotifications/>
              </div>
            </div>
        </section>
    )
}