"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "auto",
    setTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("auto");

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (targetTheme: "light" | "dark") => {
            if (targetTheme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        };

        const handleAutoTheme = () => {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            // Optional: Sunrise/Sunset logic could go here, but system preference is usually best for "Auto"
            // For strictly sunrise/sunset (6am-6pm), we can add that logic if requested.
            // For now, "Auto" follows system.
            applyTheme(systemPrefersDark ? "dark" : "light");
        };

        if (theme === "auto") {
            handleAutoTheme();
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            mediaQuery.addEventListener("change", handleAutoTheme);
            return () => mediaQuery.removeEventListener("change", handleAutoTheme);
        } else {
            applyTheme(theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
