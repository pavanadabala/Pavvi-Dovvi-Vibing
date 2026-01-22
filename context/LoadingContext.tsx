"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    triggerPageLoad: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    const triggerPageLoad = () => {
        setIsLoading(true);
        // Simulate loading duration or wait for actual navigation
        setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5s fast spin to represent load
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, triggerPageLoad }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
