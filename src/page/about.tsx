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
            <div className="absolute left-[20%] top-[15%] z-2">
                <button onClick={changeTheme}>
                    change
                </button>
                <div className="timeline">
        <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
                <h3>Virtuous Tech Enterprise</h3>
                <p>Remote: Edo State, Nigeria</p>
                <p>Frontend Developer with React</p>
                <p>2024 - Present</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
                <h3>SKI MUSIC</h3>
                <p>Remote: Lagos State, Nigeria</p>
                <p>Lead Mobile App Developer</p>
                <p>2024</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
                <h3>BIG Foundation (MY GRIND APP)</h3>
                <p>Remote: Lagos State, Nigeria</p>
                <p>Lead Developer</p>
                <p>2023</p>
            </div>
        </div>
    </div>
            </div>
            </div>
       </section>
    )
}