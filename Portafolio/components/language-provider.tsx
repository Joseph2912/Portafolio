"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type Language, translations } from "@/lib/translations";

const STORAGE_KEY = "portfolio-language";

type LanguageContextValue = {
    language: Language;
    setLanguage: (language: Language) => void;
    dictionary: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "en" || stored === "es") {
            setLanguage(stored);
        }
    }, []);

    useEffect(() => {
        const { meta } = translations[language];

        window.localStorage.setItem(STORAGE_KEY, language);
        document.documentElement.lang = language;
        document.title = meta.title;

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute("content", meta.description);
        }
    }, [language]);

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            dictionary: translations[language],
        }),
        [language],
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }

    return context;
}
