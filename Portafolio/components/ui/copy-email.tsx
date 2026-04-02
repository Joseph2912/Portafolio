"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/contact-links";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function CopyEmail({ className }: { className?: string }) {
    const { dictionary } = useLanguage();
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            onClick={copy}
            type="button"
            variant="outline"
            size="sm"
            title={CONTACT_EMAIL}
            className={cn(
                "group rounded-full border-border/70 px-3 text-sm text-muted-foreground hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300",
                copied ? "border-teal-500/35 text-teal-700 dark:text-teal-300" : "",
                className,
            )}
            aria-label={dictionary.common.copyEmailAria}
        >
            {copied ? dictionary.common.actions.copiedEmail : dictionary.common.actions.copyEmail}
            <span className="relative size-4">
                <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                        <motion.span
                            key="check"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute inset-0 flex items-center justify-center text-emerald-500"
                        >
                            <Check size={12} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="copy"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex items-center justify-center opacity-0 [transition-property:opacity] duration-150 group-hover:opacity-100"
                        >
                            <Copy size={12} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
        </Button>
    );
}
