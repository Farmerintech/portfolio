import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"
import { Aside } from "../component/aside"
import { Header } from "../component/header"
import { Footer } from "../component/footer"
import myphoto from "../assets/farmerintech.png"
import { ProgressBar } from "../component/progressBar"
export const About = () =>{
    const {Theme,} = useContext(ThemeContext)
    return(
        <section className={`${Theme === 'light' ? "bg-white text-black" : "bg-gray-800 text-white"} w-full 
        min-h-screen flex flex-col pb-10`}>
            <Header/>
            <div className="bg-white flex ">
                <div className="">
                <Aside/>
                </div>
            <div className="absolute md:left-[300px] lg:left-[280px]  left-[20%] top-[15%] z-2 mt-10">
               <div className="md:flex items-center justify-center p-5">
                 <div>
                    <img src={myphoto} alt='farmerintech' className="w-[200px] h-[200px] rounded-full border"/>
                    <h3 className="font-bold text-xl mt-2 mb-5 mt-5">Full stack Mobile & web Developer</h3>
                 </div>
                 <div>
                    <p><span className="font-bold">Name</span>: Yakub Shakirudeen Olaide</p>
                    <p><span className="font-bold">Nationality</span>: Nigeria</p>
                    <p><span className="font-bold">College Degree</span>: Bachelor of Agriculture</p>
                 </div>
                 <div>
                    <p><span className="font-bold">Aliases</span>: Farmerintech, Optimist</p>
                    <p><span className="font-bold">Zodic</span>: Leo (july, 28)</p>
                    <p><span className="font-bold">Availability</span>: Freelance, Remote, oniste and hybrid</p>
                 </div>
               </div>
               <div>
                 <p className="p-5">A passionate Developer with 2+ years of experience 
                    developing innovative solutions that meet client satisfaction 
                    using the easiest, yet effective approach possible. I am so much interested in sustainable developement 
                    practices and how i canmake use of innovative tech solution to combat major sustainable problems.
                 </p>
               </div>
               <div className="p-5 w-full">
                  <p className="font-bold text-2xl">Skills</p>
                  <div className="md:flex w-[100%] mt-5 ">
                  <div className="w-full md:w-1/2 pr-4">
                      <p>Javascript</p>
                      <ProgressBar width={60}/>
                      <p>CSS, Boostrap & Tailwind</p>
                      <ProgressBar width={70}/>
                      <p>Git, postman, Thunder-client</p>
                      <ProgressBar width={70}/>
                    </div> 
                    <div className="w-full md:w-1/2 pr-4">
                      <p>ReactJs & React Native</p>
                      <ProgressBar width={60}/>
                      <p>Typscript</p>
                      <ProgressBar width={40}/>
                      <p>MongoDB, ExpressJS & NodeJS</p>
                    <ProgressBar width={65}/>
                    </div> 
                    
                  </div>
               </div>
            </div>
        </div>
    <Footer/>
       </section>
    )
}