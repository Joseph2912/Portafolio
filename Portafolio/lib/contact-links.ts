import type { Language } from "@/lib/translations";

export const CONTACT_EMAIL = "joseph.cuartas.dev@gmail.com";
export const WHATSAPP_PHONE = "573132435910";
export const RESUME_DOWNLOAD_PATH = "https://drive.google.com/uc?export=download&id=1ytVwn3pbDFtsj8qp79lyhq3uEEXN1Q4s";

const WHATSAPP_MESSAGES: Record<Language, string> = {
    en: "Hi Joseph, I saw your portfolio and would like to talk about an opportunity.",
    es: "Hola Joseph, vi tu portafolio y me gustaria hablar contigo sobre una oportunidad.",
};

export function getWhatsAppHref(language: Language) {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGES[language])}`;
}
