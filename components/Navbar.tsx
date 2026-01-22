"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogIn, LogOut, Bell, Sun, Moon, Monitor } from "lucide-react";
import Button from "@/components/ui/Button";
import WelcomeOverlay from "@/components/ui/WelcomeOverlay";
import WindmillLogo from "@/components/ui/WindmillLogo";
import { useTheme } from "@/context/ThemeContext";

import { useState } from "react";

export default function Navbar() {
    const { user, loading, showWelcome, dismissWelcome } = useAuth();
    const { theme, setTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsMobileMenuOpen(false);
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
            <nav className="bg-microsoft-glass backdrop-blur-md border-b border-gray-200/20 sticky top-0 z-50 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex-shrink-0 flex items-center group -ml-2">
                                <WindmillLogo />
                                <span className="text-xs sm:text-xl font-bold tracking-widest sm:tracking-[0.2em] uppercase text-[#DCA376] -ml-2 pt-1 font-sans truncate max-w-[200px] sm:max-w-none">
                                    Pavvi Dovvi Vibing
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

                        {/* Desktop Menu */}
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

                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? (
                                    <LogOut className="block h-6 w-6 rotate-45" /> // Using LogOut rotated as X for simplicity or import X/Menu from lucide
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-indigo-50 dark:bg-gray-800 border-indigo-500 text-indigo-700 dark:text-indigo-400 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/projects"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Projects
                            </Link>
                        </div>
                        <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center px-4 space-x-4">
                                <div className="flex-shrink-0">
                                    <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full !p-2">
                                        {getThemeIcon()}
                                    </Button>
                                </div>
                                <div className="flex-shrink-0">
                                    <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)} className="rounded-full !p-2">
                                        <Bell className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                {!loading && (
                                    <>
                                        {user ? (
                                            <>
                                                <div className="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start px-3"
                                                    onClick={handleLogout}
                                                >
                                                    <LogOut className="h-5 w-5 mr-2" />
                                                    Sign out
                                                </Button>
                                            </>
                                        ) : (
                                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                                <Button variant="primary" className="w-full justify-center">
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
                )}
            </nav>
        </>
    );
}
