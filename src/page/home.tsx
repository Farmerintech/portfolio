import { useContext, useEffect, useRef, useState } from "react"
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
import { Button } from "../component/ButtonProx"
import { useNavigate } from "react-router"

export const Home = () =>{
    const {Theme, } = useContext(ThemeContext)
    const navigate = useNavigate();
    const goTo = (link:string)=>{
        navigate(link)
    }



  const textRef = useRef<HTMLParagraphElement>(null);
  const [currentText, setCurrentText] = useState('');
  const Text = 'Hi 👋, I am Yakub shakirudeen Olide, A Software Developer With 👇';
  let index = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(Text.slice(0, index));
      index++;
      if (index > Text.length) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);




    return(
        <section className={`${Theme === 'light' ? "bg-stone-50 text-black" : "bg-gray-800 text-white"} w-full 
        min-h-screen flex flex-col`}>
            <Header/>
            <div className="bg-white flex ">
                <div className="">
                <Aside/>
                </div>
            <div className="absolute md:left-[340px] lg:left-[280px] left-[20%] top-[30%] md:top-[15%] z-2">
                <div className="flex items-center justify-center ">
                <div className="lg:w-[50%] w-[100%]">
                    <h1 className={`font-bold text-2xl md:text-3xl xs:text-md `}>
                        FarmerIntech
                    </h1>
                    <p className={`text-xl md:text-2xl mt-5  `} ref={textRef}>{currentText}</p>
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
                
                <div className="hidden lg:block">
                    <img src={image} alt={'avatar'} className="w-[400px] h-[400px] "/>
                </div>
        </div>
        <div className="flex items-center justify-center gap-5 pb-5 mb-10 mt-10 lg:mt-0">
            <Button name={'View work'} action={()=>goTo('/projects') } addStyle={`bg-blue-500 hover:bg-blue-600 ${Theme==='light' ? "text-white": "text-stone-50"}`} />
            <Button name={'My Resume'} action={()=>goTo('/resume') } addStyle={`bg-yellow-500 hover:bg-yellow-600 ${Theme==='light' ? "text-white": "text-stone-50"}`} />
        </div>
        </div>
    </div>
    <Footer/>
       </section>
    )
}