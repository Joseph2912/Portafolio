"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { Loader2, CheckCircle, AlertCircle, FileDown, MessageCircle } from "lucide-react";
import { getContactSchema, type ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "@/components/ui/copy-email";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { CONTACT_EMAIL, getWhatsAppHref, RESUME_DOWNLOAD_PATH } from "@/lib/contact-links";

export default function Contact() {
    const { language, dictionary } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const resolver = useMemo(() => zodResolver(getContactSchema(language)), [language]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setFocus,
        setValue,
    } = useForm<ContactFormData>({
        resolver,
    });

    const applyShortcut = (message: string) => {
        setValue("message", message, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
        setFocus("message");
    };

    const onSubmit = async (data: ContactFormData) => {
        setSendError(null);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json().catch(() => null);
                throw new Error(json?.error || dictionary.contact.errors.failed);
            }

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            reset();
        } catch (err) {
            setSendError(err instanceof Error ? err.message : dictionary.contact.errors.generic);
        }
    };

    return (
        <section id="contact" className="panel-surface panel-surface-ghost scroll-mt-24">
            <span className="mb-8 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {dictionary.contact.title}
            </span>

            <div className="mb-8 max-w-2xl">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{dictionary.contact.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dictionary.contact.description}</p>
            </div>

            <div className="mb-8 flex max-w-2xl flex-col gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {dictionary.contact.quickActionsLabel}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-full border-border/70 text-muted-foreground hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300"
                    >
                        <a href={getWhatsAppHref(language)} target="_blank" rel="noopener noreferrer">
                            <MessageCircle />
                            {dictionary.common.actions.whatsapp}
                        </a>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-full border-border/70 text-muted-foreground hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300"
                    >
                        <a href={RESUME_DOWNLOAD_PATH} download>
                            <FileDown />
                            {dictionary.common.actions.resume}
                        </a>
                    </Button>

                    <CopyEmail />
                </div>

                <p className="text-sm text-muted-foreground">{CONTACT_EMAIL}</p>
            </div>

            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="flex max-w-2xl items-center gap-2 rounded-[var(--radius-control)] border border-border/70 bg-background px-4 py-4 text-sm text-muted-foreground"
                    >
                        <CheckCircle size={16} className="text-foreground" />
                        {dictionary.contact.success}
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-2xl"
                        noValidate
                    >
                        <FieldGroup className="gap-6">
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                    {dictionary.contact.shortcutLabel}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {dictionary.contact.shortcuts.map((shortcut) => (
                                        <Button
                                            key={shortcut.label}
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => applyShortcut(shortcut.message)}
                                            className="rounded-full border-border/70 text-muted-foreground hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300"
                                        >
                                            {shortcut.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Field data-invalid={errors.name ? true : undefined}>
                                <FieldLabel htmlFor="name">{dictionary.contact.fields.name}</FieldLabel>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    placeholder={dictionary.contact.placeholders.name}
                                    aria-invalid={!!errors.name}
                                />
                                {errors.name && (
                                    <FieldDescription className="text-destructive">
                                        {errors.name.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            <Field data-invalid={errors.email ? true : undefined}>
                                <FieldLabel htmlFor="email">{dictionary.contact.fields.email}</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    placeholder={dictionary.contact.placeholders.email}
                                    aria-invalid={!!errors.email}
                                />
                                {errors.email && (
                                    <FieldDescription className="text-destructive">
                                        {errors.email.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            <Field data-invalid={errors.message ? true : undefined}>
                                <FieldLabel htmlFor="message">{dictionary.contact.fields.message}</FieldLabel>
                                <Textarea
                                    id="message"
                                    {...register("message")}
                                    rows={4}
                                    placeholder={dictionary.contact.placeholders.message}
                                    aria-invalid={!!errors.message}
                                />
                                {errors.message && (
                                    <FieldDescription className="text-destructive">
                                        {errors.message.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 self-start rounded-[var(--radius-control)] bg-teal-500 px-5 py-3 text-zinc-950 hover:bg-teal-400 focus-visible:ring-teal-500/30"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        {dictionary.contact.sending}
                                    </>
                                ) : (
                                    dictionary.contact.send
                                )}
                            </Button>

                            {sendError && (
                                <p className="flex items-center gap-1.5 text-sm text-destructive">
                                    <AlertCircle size={14} />
                                    {sendError}
                                </p>
                            )}
                        </FieldGroup>
                    </motion.form>
                )}
            </AnimatePresence>
        </section>
    );
}
