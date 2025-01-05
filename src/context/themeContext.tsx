import { createContext } from "react";


interface AppContextType {
    changeTheme: () => void;
    Robiah: () => void;
    Farmerintech: () => void;
    Theme: string;
}

export const ThemeContext = createContext<AppContextType>({
    Theme: 'light',
    changeTheme: () => {},
    Robiah: () => {},
    Farmerintech: () => {}

});

