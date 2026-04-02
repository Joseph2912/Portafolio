"use client";

import { startTransition } from "react";
import { useLanguage } from "@/components/language-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Language } from "@/lib/translations";

const OPTIONS: Language[] = ["en", "es"];

export function LanguageToggle() {
    const { language, setLanguage, dictionary } = useLanguage();

    return (
        <ToggleGroup
            type="single"
            value={language}
            onValueChange={(value) => {
                if (!value) {
                    return;
                }

                startTransition(() => setLanguage(value as Language));
            }}
            variant="outline"
            size="sm"
            spacing={1}
            className="rounded-[var(--radius-control)] border border-border/70 bg-card p-1 shadow-[0_1px_0_0_var(--border)]"
            aria-label="Language selector"
        >
            {OPTIONS.map((option) => (
                <ToggleGroupItem
                    key={option}
                    value={option}
                    aria-label={dictionary.common.languageAria[option]}
                    className="min-w-11 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] data-[state=on]:bg-foreground data-[state=on]:text-background hover:data-[state=on]:bg-foreground"
                >
                    {dictionary.common.languageLabels[option]}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
