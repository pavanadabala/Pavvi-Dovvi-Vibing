"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    showWelcome: boolean;
    triggerWelcome: () => void;
    dismissWelcome: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    showWelcome: false,
    triggerWelcome: () => { },
    dismissWelcome: () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const triggerWelcome = () => {
        setShowWelcome(true);
    };

    const dismissWelcome = () => {
        setShowWelcome(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, showWelcome, triggerWelcome, dismissWelcome }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
