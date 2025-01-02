import HTML_icon from "../assets/html_icon.svg";
import JS_icon from "../assets/js_icon.svg"
import JSON_icon from "../assets/json_icon.svg"
import REACT_icon from "../assets/react_icon.svg"
import GITHUB_icon from "../assets/markdown_icon.svg"
import {  BiLogoTiktok, } from "react-icons/bi"
import { FiCopy, FiFacebook, FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi"

export const imageIcons = [
    {
        icon:REACT_icon,
        name:'home.tsx'
    },
    {
        icon:HTML_icon,
        name:'about.html'
    },
    {
        icon:JS_icon,
        name:'resume.js'
    },
    {
        icon:JSON_icon,
        name:'project.json'
    },
    
    {
        icon:GITHUB_icon,
        name:'github.md'
    }
]

export const icons = 
[
    <FiCopy  size={20}/>,
    <FiTwitter  size={20}/>,
    <FiGithub size={20}/>,
    <FiFacebook size={20}/>,
    <FiLinkedin size={20}/>,
    <BiLogoTiktok size={20}/>,
    <FiMail size={20}/>,
]