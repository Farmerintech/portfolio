import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/themeContext";
import { imageIcons } from "./icons";
import { Link } from "react-router";
import image from "../assets/portfolio.jpg"
export const Header = () => {
    const { Theme, changeTheme } = useContext(ThemeContext);

    useEffect(() => {
        console.log(Theme);
    }, [Theme]);


   
    return (
        <header className={`${Theme === 'light' ? "bg-stone-50 text-black" : "bg-gray-800 text-white"} 
         fixed top-0 w-full z-20 `}>
            <div className={` ${Theme === 'light' ? "border-white": "border-b-gray-900"} flex border-b items-center`}>
            <img src={image} className="w-[30px] h-[30px] rounded-full"/>
            <div className="flex justify-center items-center md:gap-80 px-5 w-full">
                <input type="text" 
                className={`
                    ${Theme === 'light' ? "bg-white border-stone-50" : "bg-gray-700  border-gray-800"} 
                    my-2 rounded border md:w-1/2 bg-none outline-none `} 
                    onClick={changeTheme}
                placeholder="<farmerinTech/>"/>
            </div>
            </div>
            <div className="flex-1 flex-col w-full z-20 absolute left-[10%] md:left-[253px]">
            <ul className={`${Theme === 'light' ? "bg-gray-50 text-black" : "bg-gray-800 text-white"} p-1 mr-5 flex justify-start gap-2 overflow-x-auto custom-scrollbar w-[90%] md:w-full `}>
                {
                     imageIcons.map(image =>(
                        <Link to='/' className={`${Theme === 'light' ? "border-white text-black" : "border-gray-900 text-white"} md:border-r p-2 `}>
                            <li className={`flex gap-2 items-center justify-start text-sm w-[150px]`} key={image.name}>
                            <img src={image.icon} alt={image.name} className="w-[20px]"/>
                            <span>{image.name}</span>
                           </li>
                        </Link> 
                    ))
                }
            </ul>
           
            </div>
        </header>
    );
};
