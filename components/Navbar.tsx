"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogIn, LogOut, Bell, Sun, Moon, Monitor } from "lucide-react";
import Button from "@/components/ui/Button";
import WelcomeOverlay from "@/components/ui/WelcomeOverlay";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function Navbar() {
    const { user, loading, showWelcome, dismissWelcome } = useAuth();
    const { theme, setTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("auto");
        else setTheme("light");
    };

    const getThemeIcon = () => {
        if (theme === "light") return <Sun className="h-5 w-5" />;
        if (theme === "dark") return <Moon className="h-5 w-5" />;
        return <Monitor className="h-5 w-5" />;
    };

    return (
        <>
            <WelcomeOverlay show={showWelcome} onComplete={dismissWelcome} />
            <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Portfolio
                                </span>
                            </Link>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/"
                                    className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/projects"
                                    className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Projects
                                </Link>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                            <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full !p-2">
                                {getThemeIcon()}
                            </Button>

                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="rounded-full !p-2"
                                >
                                    <Bell className="h-5 w-5" />
                                </Button>
                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            No new notifications
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!loading && (
                                <>
                                    {user ? (
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{user.email}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleLogout}
                                                className="rounded-full !p-2"
                                            >
                                                <LogOut className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Link href="/login">
                                            <Button variant="primary" size="sm">
                                                <LogIn className="h-4 w-4 mr-2" />
                                                Login
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
