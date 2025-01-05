import { useContext } from "react"
import { Aside } from "../component/aside"
import { Header } from "../component/header"
import { ThemeContext } from "../context/themeContext"
import { ChangeTheme } from "../component/changeTheme"
import { Footer } from "../component/footer"

export const Settings = ()=>{
        
    const {Theme,} = useContext(ThemeContext)
    
    return(
        <>
        <section className={`${Theme === 'light' ? "bg-white text-black" : "bg-gray-800 text-white"} w-full 
                min-h-screen flex flex-col pb-10`}>
            <Header/>
            <div className="bg-white flex ">
                <div className="">
                    <Aside/>
                </div>
                <div className="absolute md:left-[50%] lg:left-[50%]  left-[30%] top-[15%] z-2 mt-10 mb-10">
                  <div className="flex justify-center items-center pb-10 mb-10">
                  <ChangeTheme/>
                  </div>
                </div>
          </div>
          <Footer/>
          </section>
        </>
    )
}