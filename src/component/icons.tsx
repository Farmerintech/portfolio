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

export const icons = [
    { component: <FiCopy size={20} />, url: '/' },
    { component: <FiTwitter size={20} />, url: 'https://x.com/farmerintech/' },
    { component: <FiGithub size={20} />, url: 'https://github.com/Farmerintech/' },
    { component: <FiFacebook size={20} />, url: 'https://facebook.com/farmerintech/' },
    { component: <FiLinkedin size={20} />, url: '#' }, // Replace with LinkedIn URL
    { component: <BiLogoTiktok size={20} />, url: '#' }, // Replace with TikTok URL
    { component: <FiMail size={20} />, url: 'mailto:yakubshakirudeenolaide2018@gmail.com' }, 
];