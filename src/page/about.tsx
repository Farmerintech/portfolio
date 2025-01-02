import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"
import { Main } from "../component/aside"
import { Header } from "../component/header"

export const About = () =>{
    const {Theme, changeTheme} = useContext(ThemeContext)
    return(
        <section className={`${Theme === 'light' ? "bg-white text-black" : "bg-gray-800 text-white"} w-full 
        min-h-screen flex flex-col`}>
            <Header/>
            <div className="bg-white flex ">
                <div className="">
                <Main/>
                </div>
            <div className="absolute left-[20%] top-[15%] z-2 mt-10">
                
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
       </section>
    )
}