import { PropsWithChildren, useState } from "react";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = (props: PropsWithChildren) => {
    const [theme, setTheme] = useState('light');

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ Theme: theme, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};
