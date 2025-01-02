import { createContext } from "react";


interface AppContextType {
    changeTheme: () => void;
    Theme: string;
}

export const ThemeContext = createContext<AppContextType>({
    Theme: 'light',
    changeTheme: () => {}
});

