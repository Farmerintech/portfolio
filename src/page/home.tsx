import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"
import { Aside } from "../component/aside"
import { Header } from "../component/header"
import image from "../assets/avatar.png"
import { Footer } from "../component/footer"
import JS_icon from "../assets/js_icon.svg"
import Nodejs from "../assets/nodejs.png"
import Node_dark from "../assets/node_dark.png"
import REACT_icon from "../assets/react_icon.svg"
import express from "../assets/express.png"
import mongo from "../assets/mongodb.png"

export const Home = () =>{
    const {Theme, } = useContext(ThemeContext)
    return(
        <section className={`${Theme === 'light' ? "bg-stone-50 text-black" : "bg-gray-800 text-white"} w-full 
        min-h-screen flex flex-col`}>
            <Header/>
            <div className="bg-white flex ">
                <div className="">
                <Aside/>
                </div>
            <div className="absolute md:left-[300px] lg:left-[280px] left-[20%] top-[30%] md:top-[15%] z-2">
                <div className="flex items-center justify-center ">
                <div className="">
                    <h1 className={`font-bold text-3xl md:text-5xl xs:text-md`}>
                        FarmerIntech
                    </h1>
                    <p className={`text-xl md:text-3xl mt-5`}>Software Developer With React</p>
                    <div className="flex justify-center items-center md:gap-4">
                       <div className="flex flex-col items-center ">
                            <img src={REACT_icon} alt={'React icon'} className="w-[50px] md:w-[100px] h-[50px] rounded"/>
                            <p className="hidden md:block">React</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <img src={JS_icon } alt={'avatar'} className="w-[50px] h-[50px] w-[100px] md:h-[100px] rounded"/>
                            <p className="hidden md:block">JavaScript</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <img src={`${Theme === 'light' ? Nodejs :Node_dark}`} alt={'Nodejs'} className="w-[80px] h-[50px] md:w-[100px] h-[100px] rounded"/>
                            <p className="hidden md:block">NodeJs</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <img src={express} alt={'avatar'} className=" w-[100px] h-[50px] md:w-[100px] h-[100px] rounded"/>
                            <p className="hidden md:block">Express</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <img src={mongo} alt={'avatar'} className=" w-[50px] h-[50px] md:w-[100px] h-[100px] rounded"/>
                            <p className="hidden md:block">Mongo</p>
                        </div>
                    </div>
                </div>
                
                <div className="hidden md:block">
                    <img src={image} alt={'avatar'} className="w-[500px] h-[500px] "/>
                </div>
        </div>
        </div>
    </div>
    <Footer/>
       </section>
    )
}