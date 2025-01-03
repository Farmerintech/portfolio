import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"
import { Aside } from "../component/aside"
import { Header } from "../component/header"
import { Footer } from "../component/footer"

export const Resume = () =>{
    const {Theme,} = useContext(ThemeContext)
    return(
        <section className={`${Theme === 'light' ? "bg-white text-black" : "bg-gray-800 text-white"} w-full 
        min-h-screen flex flex-col`}>
            <Header/>
            <div className="bg-white flex ">
                <div className="">
                <Aside/>
                </div>
            <div className="absolute md:left-[300px] lg:left-[280px] left-[20%] top-[15%] z-2 mt-10">
                
        <div className="timeline">
        <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="">
                <h3>Cypherdev Technologies</h3>
                <p>Type: Learning-experience</p>
                <p>Physical: Kwara State, Nigeria</p>
                <p>Backend Developement with Nodejs</p>
                <p>2024 - Present</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="">
                <h3>Frontend Skills</h3>
                <p>Type: Learning-experience</p>
                <p>Physical: Kwara State, Nigeria</p>
                <p>Frontend Developement with React</p>
                <p>2024</p>
            </div>
        </div>
    </div>
            </div>
            </div>
        <Footer/>
       </section>
    )
}