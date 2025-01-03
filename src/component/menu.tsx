import { useContext } from "react";
import { icons } from "./icons";
import { NavList } from "./Nav/navList"
import { ThemeContext } from "../context/themeContext";
import { BiUserCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";


export const MenuIcons = () =>{
    const { Theme } = useContext(ThemeContext);

  return(
    <>
    <aside className="min-h-screen flex gap-2 ">
    <div className={`${Theme==='light' ? 'bg-white md:bg-gray-50': 'bg-gray-800 md:bg-gray-700'}`}>
        <div className={`w-[10%] flex flex-col gap-5 p-3`}>
            {
                icons.map(icon =>(
                    <div>
                        {icon}
                    </div>
                ))
            }
        </div>
        <div className="absolute bottom-[20%] w-[10%] flex flex-col gap-5 p-3">
            <div>
                <BiUserCircle size={20}/>
            </div>
            <div>
                <FiSettings size={20}/>
            </div>
        </div>
    </div>
    <section className={`${Theme==='light' ? 'bg-white text-black md:border-white ' : 'bg-gray-800 text-stone-50 md:border-gray-900' 
    } md:border-r   `}>
        <NavList/>
    </section>
    </aside>
    </>
  )
}