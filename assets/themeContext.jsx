import { createContext, useContext } from 'react';

export const PortfolioThemeContext = createContext({
    darkMode: true,
    toggleDarkMode: () => {}
});

export function usePortfolioTheme() {
    return useContext(PortfolioThemeContext);
}
