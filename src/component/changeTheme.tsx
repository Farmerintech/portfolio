import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"
import farmerintech from "../assets/farmerintech.png"
import avater from "../assets/avater.jpg"

export const ChangeTheme = ()=>{
    const {Robiah, Farmerintech, Theme} = useContext(ThemeContext)
    
    return(
        <section className="flex flex-col items-center justify-center gap-8">
            <div onClick={Robiah} className="flex flex-col items-center gap-5 ">
                <img src={avater} alt={''} className="w-[100px] h-[100px] rounded-full"/>
                <p className={`${Theme ==='light' ? 'bg-white p-2 ': 'bg-gray-800 p-2'} rounded`}>Robiah:Light mode</p>
            </div>
            <div onClick={Farmerintech}  className="flex flex-col items-center gap-5 ">
                <img src={farmerintech} alt={''} className="w-[100px] h-[100px] rounded-full"/>
                <p className={`${Theme ==='light' ? 'bg-white p-2 ': 'bg-gray-800 p-2'} rounded`}>Farmerintech:Dark mode</p>
            </div>
        </section>
    )
}