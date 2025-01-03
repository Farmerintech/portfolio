import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { imageIcons } from "../icons";
import { Link } from "react-router";


export const NavList = () =>{
    return(
       <ul className="hidden md:block w-[200px] pl-5 pt-2">
        <h3 className="hidden md:block mb-3">EXPLORER</h3>
        <p className="flex items-center mb-3">
           { true ? <BiChevronDown/> : <BiChevronUp/>}
            Portfolio
            </p>
         {
            imageIcons.map(image =>(
                <Link to={
                            image.name === 'home.tsx'? '/': image.name ==='about.html' ? '/about':
                            image.name ==='resume.js' ? '/resume' : image.name ==='project.json' ? '/projects':'github'
                         }
                className={`hidden md:flex gap-2 items-center justify-start  text-left text-sm mb-3`} key={image.name}>
                    <img src={image.icon} alt={image.name} className="w-[20px]"/>
                    <span>{image.name}</span>
                </Link>
            ))
        }
       </ul>
    )
}
{/* <ul className="flex justify-start gap-8 overflow-x-scroll custom-scrollbar ml-2">
{
     imageIcons.map(image =>(
        <Link to='/'>
            <li className={`flex gap-2 items-center justify-start text-left`} key={image.name}>
            <img src={image.icon} alt={image.name} className="w-[20px]"/>
            <span>{image.name}</span>
           </li>
        </Link> 
    ))
}
</ul> */}