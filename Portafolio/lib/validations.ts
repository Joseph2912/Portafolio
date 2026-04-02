import { z } from "zod";
import { translations, type Language } from "@/lib/translations";

export function getContactSchema(language: Language) {
    const errors = translations[language].contact.errors;

    return z.object({
        name: z.string().min(2, errors.nameMin),
        email: z.string().email(errors.emailInvalid),
        message: z.string().min(10, errors.messageMin),
    });
}

export const contactSchema = getContactSchema("en");

export type ContactFormData = z.infer<typeof contactSchema>;
