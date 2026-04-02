"use client";

import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const TECH_LINKS: Record<string, string> = {
    React: "https://react.dev/",
    "Next.js": "https://nextjs.org/",
    Vite: "https://vite.dev/",
    TypeScript: "https://www.typescriptlang.org/",
    Zustand: "https://zustand.docs.pmnd.rs/",
    Clerk: "https://clerk.com/",
    Prisma: "https://www.prisma.io/",
    Supabase: "https://supabase.com/",
    Firebase: "https://firebase.google.com/",
    Figma: "https://www.figma.com/",
    Notion: "https://www.notion.so/",
    Claude: "https://claude.ai/",
    "GitHub Copilot": "https://github.com/features/copilot",
    "Tailwind CSS": "https://tailwindcss.com/",
    "shadcn/ui": "https://ui.shadcn.com/",
    Zod: "https://zod.dev/",
};

const TECH_META: Record<string, { mark: string; tone: string; tag: { en: string; es: string } }> = {
    React: {
        mark: "R",
        tone: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
        tag: { en: "UI", es: "UI" },
    },
    "Next.js": {
        mark: "N",
        tone: "bg-foreground text-background",
        tag: { en: "app", es: "app" },
    },
    Vite: {
        mark: "V",
        tone: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
        tag: { en: "build", es: "build" },
    },
    TypeScript: {
        mark: "TS",
        tone: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
        tag: { en: "types", es: "types" },
    },
    "Tailwind CSS": {
        mark: "TW",
        tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
        tag: { en: "style", es: "style" },
    },
    "shadcn/ui": {
        mark: "UI",
        tone: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
        tag: { en: "kit", es: "kit" },
    },
    Zustand: {
        mark: "ZU",
        tone: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
        tag: { en: "state", es: "estado" },
    },
    Supabase: {
        mark: "SB",
        tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
        tag: { en: "data", es: "datos" },
    },
    Firebase: {
        mark: "FB",
        tone: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
        tag: { en: "realtime", es: "realtime" },
    },
    Clerk: {
        mark: "CL",
        tone: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300",
        tag: { en: "auth", es: "auth" },
    },
    Prisma: {
        mark: "PR",
        tone: "bg-slate-500/15 text-slate-700 dark:text-slate-300",
        tag: { en: "orm", es: "orm" },
    },
    Zod: {
        mark: "Z",
        tone: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
        tag: { en: "schema", es: "schema" },
    },
    Figma: {
        mark: "FG",
        tone: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
        tag: { en: "design", es: "diseno" },
    },
    Notion: {
        mark: "NO",
        tone: "bg-stone-500/15 text-stone-700 dark:text-stone-300",
        tag: { en: "docs", es: "docs" },
    },
    Claude: {
        mark: "AI",
        tone: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
        tag: { en: "assist", es: "asiste" },
    },
    "GitHub Copilot": {
        mark: "GH",
        tone: "bg-teal-500/15 text-teal-700 dark:text-teal-300",
        tag: { en: "code", es: "code" },
    },
};

const STACK_COPY = {
    en: {
        eyebrow: "Current toolkit",
        title: "Tools I actually use to design, build, and ship product UI",
        description:
            "A mix of frontend foundations, data services, workflow tools, and AI support. This is the stack I keep returning to instead of a generic wishlist.",
        badges: ["16 tools", "4 lanes", "UI + data + workflow"],
        notes: [
            "Main frontend layer for apps, dashboards, and interaction-heavy product surfaces.",
            "Database, auth, and schema tools I combine depending on the product and delivery speed needed.",
            "Where ideas, flows, and product notes get shaped before implementation.",
            "AI tools I use to explore, unblock, and move faster without letting them replace judgment.",
        ],
    },
    es: {
        eyebrow: "Toolkit actual",
        title: "Herramientas que sí uso para diseñar, construir y entregar interfaces",
        description:
            "Una mezcla de frontend, servicios de datos, workflow y apoyo con IA. No es una lista genérica: es el stack al que vuelvo cuando estoy construyendo producto.",
        badges: ["16 herramientas", "4 bloques", "UI + datos + workflow"],
        notes: [
            "Capa principal de frontend para apps, dashboards y flujos con bastante interacción.",
            "Base de datos, auth y validación que combino según el producto y la velocidad de entrega que necesito.",
            "Donde aterrizo ideas, flujos y notas de producto antes de implementar.",
            "Herramientas de IA que uso para investigar, desbloquear y avanzar más rápido sin reemplazar criterio.",
        ],
    },
};

const GROUP_LAYOUT = [
    "sm:col-span-12 xl:col-span-7",
    "sm:col-span-6 xl:col-span-5",
    "sm:col-span-5 xl:col-span-4",
    "sm:col-span-7 xl:col-span-8",
] as const;

const GROUP_TONES = [
    "border-teal-500/18 bg-[linear-gradient(180deg,rgba(20,184,166,0.08),rgba(20,184,166,0.02))]",
    "border-emerald-500/18 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(16,185,129,0.02))]",
    "border-amber-500/18 bg-[linear-gradient(180deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02))]",
    "border-sky-500/18 bg-[linear-gradient(180deg,rgba(14,165,233,0.08),rgba(14,165,233,0.02))]",
] as const;

export default function Stack() {
    const { dictionary, language } = useLanguage();
    const copy = STACK_COPY[language];

    return (
        <section id="stack" className="panel-surface panel-surface-ghost scroll-mt-24">
            <span className="mb-8 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {dictionary.stack.title}
            </span>

            <div className="grid gap-4 sm:grid-cols-12">
                <article className="overflow-hidden rounded-[var(--radius-surface)] border border-border/65 bg-background/85 sm:col-span-12 xl:col-span-12">
                    <div className="grid gap-6 px-5 py-5 sm:px-6 sm:py-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
                        <div>
                            <p className="technical-label text-[10px] font-medium uppercase text-muted-foreground">
                                {copy.eyebrow}
                            </p>
                            <h2 className="mt-3 max-w-3xl text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                                {copy.title}
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                {copy.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:grid-cols-1">
                            {copy.badges.map((badge) => (
                                <Badge
                                    key={badge}
                                    variant="outline"
                                    className="justify-center rounded-full border-border/60 bg-background/80 px-3 py-1.5 text-[10px] text-foreground/75"
                                >
                                    {badge}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border/60 bg-muted/20 px-5 py-4 sm:px-6">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="rounded-full border border-border/55 bg-background/80 px-3 py-1">
                                React + TypeScript
                            </span>
                            <span className="rounded-full border border-border/55 bg-background/80 px-3 py-1">
                                Next.js / Vite
                            </span>
                            <span className="rounded-full border border-border/55 bg-background/80 px-3 py-1">
                                Supabase / Firebase
                            </span>
                            <span className="rounded-full border border-border/55 bg-background/80 px-3 py-1">
                                Figma / Notion / AI
                            </span>
                        </div>
                    </div>
                </article>

                {dictionary.stack.groups.map((group, groupIndex) => (
                    <article
                        key={group.label}
                        className={`rounded-[var(--radius-surface)] border px-5 py-5 sm:px-6 sm:py-6 ${GROUP_LAYOUT[groupIndex] ?? "xl:col-span-6"} ${GROUP_TONES[groupIndex] ?? "border-border/50 bg-background/70"}`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="technical-label text-[10px] font-medium uppercase text-muted-foreground">
                                    {group.label}
                                </p>
                                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                    {copy.notes[groupIndex]}
                                </p>
                            </div>
                            <Badge
                                variant="outline"
                                className="border-border/60 bg-background/80 text-[10px] text-foreground/75"
                            >
                                {group.items.length}
                            </Badge>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {group.items.map((item) => (
                                <a
                                    key={item}
                                    href={TECH_LINKS[item]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-[var(--radius-control)] border border-border/55 bg-background/90 px-4 py-4 [transition-property:border-color,background-color,transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background hover:shadow-[0_18px_34px_-26px_rgba(15,23,42,0.35)]"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <span
                                            className={`inline-flex min-w-9 items-center justify-center rounded-full px-2 py-1 text-[10px] font-semibold ${TECH_META[item]?.tone ?? "bg-muted text-foreground/80"}`}
                                        >
                                            {TECH_META[item]?.mark ?? item.slice(0, 2)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                                                {TECH_META[item]?.tag[language] ?? "tool"}
                                            </span>
                                            <ArrowUpRight
                                                size={12}
                                                className="opacity-45 transition-opacity duration-150 group-hover:opacity-80"
                                            />
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm font-medium text-foreground">{item}</p>
                                </a>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
