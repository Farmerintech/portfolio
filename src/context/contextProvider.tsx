import { PropsWithChildren,  useState } from "react";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = (props: PropsWithChildren) => {
    
    const storedTheme= localStorage.getItem('theme') || 'light'
    const [theme, setTheme] = useState(storedTheme);


    const changeTheme = () => {
        
        const storedTheme= localStorage.getItem('theme');
        if(storedTheme === 'light'){
            localStorage.setItem('theme', 'dark')
        }else{
            localStorage.setItem('theme', 'light')
        }
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    const Farmerintech = () => {    
        setTheme( 'dark');     
       localStorage.setItem('theme', 'dark')
    };

const Robiah = ()=>{
    setTheme( 'light');     
    localStorage.setItem('theme', 'light')
}

    return (
        <ThemeContext.Provider value={{ Theme: theme, changeTheme, Farmerintech, Robiah }}>
            {props.children}
        </ThemeContext.Provider>
    );
};
