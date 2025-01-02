import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"
import { Main } from "../component/aside"
import { Header } from "../component/header"
import image from "../assets/avatar.png"
import { Footer } from "../component/footer"

export const Home = () =>{
    const {Theme, } = useContext(ThemeContext)
    return(
        <section className={`${Theme === 'light' ? "bg-white text-black" : "bg-gray-800 text-white"} w-full 
        min-h-screen flex flex-col`}>
            <Header/>
            <div className="bg-white flex ">
                <div className="">
                <Main/>
                </div>
            <div className="absolute md:left-[280px] left-[20%] top-[15%] z-2">
                <div className="flex items-center justify-center ">
                <div className="">
                    <h1 className="font-bold text-3xl md:text-5xl text-white xs:text-md">FarmerIntech</h1>
                    <p className={`text-xl md:text-3xl mt-5`}>Software Developer With React</p>
                </div>
                <div className="hidden md:block">
                    <img src={image} alt={'avatar'} className="w-[500px] h-[500px] rounded-full"/>
                </div>
        </div>
        </div>
    </div>
    <Footer/>
       </section>
    )
}