"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { CopyEmail } from "@/components/ui/copy-email";
import { Badge } from "@/components/ui/badge";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { CONTACT_EMAIL, getWhatsAppHref, RESUME_DOWNLOAD_PATH } from "@/lib/contact-links";

const LINKS = [
    {
        label: "GitHub",
        href: "https://github.com/Joseph2912",
        icon: GithubIcon,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/joseph-cuartas",
        icon: LinkedinIcon,
    },
] as const;

type RailPanel = "contact" | "videface" | "dragonfly" | "hidden";

const RAIL_MARKERS: Array<{ id: string; panel: RailPanel }> = [
    { id: "videface-case", panel: "videface" },
    { id: "dragonfly-case", panel: "dragonfly" },
    { id: "projects", panel: "contact" },
    { id: "contact", panel: "hidden" },
];

function ContactPanel() {
    const { language, dictionary } = useLanguage();

    return (
        <section className="panel-surface panel-surface-ghost flex flex-col gap-4 bg-card/80 p-5 supports-[backdrop-filter]:bg-card/70">
            <div className="space-y-3">
                <Badge
                    variant="outline"
                    className="w-fit border-border/70 bg-background text-[10px] text-foreground/75"
                >
                    {dictionary.rail.contactEyebrow}
                </Badge>
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">{dictionary.rail.contactTitle}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {dictionary.rail.contactDescription}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
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
                </div>

                <div className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] border border-border/50 px-4 py-3 text-sm text-muted-foreground">
                    <span className="truncate">{CONTACT_EMAIL}</span>
                    <CopyEmail className="shrink-0" />
                </div>
            </div>

            <div className="space-y-2">
                {LINKS.map(({ label, href, icon: Icon }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-[var(--radius-control)] border border-border/50 bg-transparent px-4 py-3 text-sm text-muted-foreground [transition-property:border-color,color,background-color] duration-150 ease-out hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300"
                    >
                        <span className="flex items-center gap-2">
                            <Icon size={14} />
                            {label}
                        </span>
                        <ArrowUpRight size={14} />
                    </a>
                ))}
            </div>
        </section>
    );
}

function RailCard({ title, detail, children }: { title: string; detail: string; children: ReactNode }) {
    return (
        <div className="flex flex-col rounded-[var(--radius-surface)] border border-border/55 bg-background/80 px-4 py-4">
            <div>{children}</div>
            <p className="mt-4 text-sm font-medium text-foreground">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
        </div>
    );
}

function HighlightList({ items }: { items: ReadonlyArray<{ title: string; detail: string }> }) {
    return (
        <div className="space-y-2">
            {items.map((item) => (
                <div
                    key={item.title}
                    className="rounded-[var(--radius-control)] border border-border/55 bg-background/65 px-3 py-3"
                >
                    <p className="text-xs font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
            ))}
        </div>
    );
}

type SceneItem =
    | { kind: "node"; label: string }
    | { kind: "edge"; label: string; delay: number };

const SIGNAL_FLOW: SceneItem[] = [
    { kind: "node", label: "PC A" },
    { kind: "edge", label: "Firebase RT", delay: 0 },
    { kind: "node", label: "PC B" },
    { kind: "edge", label: "localhost", delay: 0.55 },
    { kind: "node", label: "APP" },
    { kind: "edge", label: "HTTP", delay: 1.1 },
    { kind: "node", label: "BACK" },
];

function SignalScene({ reduce }: { reduce: boolean }) {
    return (
        <div className="space-y-3">
            {/* Node row with connector lines — all contained, no pixel hardcoding */}
            <div className="flex items-center">
                {SIGNAL_FLOW.map((item) =>
                    item.kind === "node" ? (
                        <div
                            key={item.label}
                            className="flex-shrink-0 rounded-[var(--radius-control)] border border-border/60 bg-background px-2 py-2 text-center text-[10px] font-medium text-foreground/80"
                        >
                            {item.label}
                        </div>
                    ) : (
                        <div key={item.label} className="relative flex min-w-0 flex-1 flex-col items-center gap-1.5">
                            {/* Connector line — overflow-hidden clips the shimmer */}
                            <div className="relative h-px w-full overflow-hidden bg-border/30">
                                {reduce ? (
                                    <div className="absolute inset-0 bg-teal-500/45" />
                                ) : (
                                    <motion.div
                                        className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{
                                            duration: 0.9,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatDelay: 1.4,
                                            delay: item.delay,
                                            ease: [0.23, 1, 0.32, 1],
                                        }}
                                    />
                                )}
                            </div>
                            <span className="text-center text-[8px] leading-tight text-muted-foreground">
                                {item.label}
                            </span>
                        </div>
                    ),
                )}
            </div>

            {/* REC pulse indicator */}
            <div className="flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
                <motion.span
                    className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-teal-700 dark:text-teal-300"
                    animate={reduce ? { opacity: 1 } : { opacity: [0.4, 1, 0.5] }}
                    transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                    ● REC
                </motion.span>
                <span className="text-[9px] text-muted-foreground/60">signal relay active</span>
            </div>
        </div>
    );
}

function DragonflyScene({ reduce }: { reduce: boolean }) {
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[10px] text-muted-foreground">
                <div className="rounded-[var(--radius-control)] border border-border/60 bg-background px-3 py-3">
                    <div className="mb-2 font-medium text-foreground/80">OFFLINE</div>
                    <div className="space-y-1">
                        {[0, 1, 2].map((item) => (
                            <motion.div
                                key={item}
                                className="h-2 rounded-full bg-teal-500/20"
                                animate={reduce ? { opacity: 1 } : { opacity: [0.35, 1, 0.45] }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: item * 0.15 }}
                            />
                        ))}
                    </div>
                </div>
                <motion.div
                    className="h-px w-8 bg-border"
                    animate={reduce ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="rounded-[var(--radius-control)] border border-border/60 bg-background px-3 py-3 text-center">
                    <motion.div
                        className="mx-auto size-6 rounded-full border border-teal-500/30"
                        animate={reduce ? { scale: 1 } : { scale: [0.92, 1.06, 1], opacity: [0.6, 1, 0.7] }}
                        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <div className="mt-2 font-medium text-foreground/80">SYNC</div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] text-muted-foreground">
                {["save", "queue", "hold", "sync"].map((item, index) => (
                    <motion.div
                        key={item}
                        className="rounded-[var(--radius-control)] border border-border/60 bg-muted/20 px-2 py-2 text-center"
                        animate={
                            reduce
                                ? index === 1
                                    ? { backgroundColor: "rgba(20,184,166,0.12)" }
                                    : undefined
                                : { opacity: [0.55, 1, 0.6], y: index === 1 ? [0, -2, 0] : [0, 0, 0] }
                        }
                        transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, delay: index * 0.12 }}
                    >
                        {item}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function VideFacePanel() {
    const { dictionary } = useLanguage();
    const reduce = useReducedMotion() ?? false;
    const highlights = dictionary.rail.videfaceHighlights;

    return (
        <section className="panel-surface panel-surface-ghost flex flex-col gap-4 bg-card/80 p-5 supports-[backdrop-filter]:bg-card/70">
            <div className="space-y-3">
                <Badge
                    variant="outline"
                    className="w-fit border-teal-500/25 bg-teal-500/8 text-[10px] text-teal-700 dark:text-teal-300"
                >
                    {dictionary.rail.inViewLabel} · VideFace
                </Badge>
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">{dictionary.rail.videfaceTitle}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {dictionary.rail.videfaceDescription}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <RailCard title={highlights[0].title} detail={highlights[0].detail}>
                    <SignalScene reduce={reduce} />
                </RailCard>

                <HighlightList items={highlights.slice(1)} />
            </div>
        </section>
    );
}

function DragonflyPanel() {
    const { dictionary } = useLanguage();
    const reduce = useReducedMotion() ?? false;
    const highlights = dictionary.rail.dragonflyHighlights;

    return (
        <section className="panel-surface panel-surface-ghost flex flex-col gap-4 bg-card/80 p-5 supports-[backdrop-filter]:bg-card/70">
            <div className="space-y-3">
                <Badge
                    variant="outline"
                    className="w-fit border-teal-500/25 bg-teal-500/8 text-[10px] text-teal-700 dark:text-teal-300"
                >
                    {dictionary.rail.inViewLabel} · Dragonfly
                </Badge>
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">{dictionary.rail.dragonflyTitle}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {dictionary.rail.dragonflyDescription}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <RailCard title={highlights[0].title} detail={highlights[0].detail}>
                    <DragonflyScene reduce={reduce} />
                </RailCard>

                {/* <RailCard title={dictionary.rail.dragonflyTitle} detail={dictionary.rail.dragonflyDescription}>
                    <HighlightList items={highlights.slice(1)} />
                </RailCard> */}
            </div>
        </section>
    );
}

export function ProfileRail() {
    const reduce = useReducedMotion() ?? false;
    const [activePanel, setActivePanel] = useState<RailPanel>("contact");

    useEffect(() => {
        let frame = 0;

        const updatePanel = () => {
            const marker = window.scrollY + window.innerHeight * 0.28;
            let nextPanel: RailPanel = "contact";

            for (const item of RAIL_MARKERS) {
                const element = document.getElementById(item.id);

                if (!element) {
                    continue;
                }

                const top = element.getBoundingClientRect().top + window.scrollY;

                if (marker >= top) {
                    nextPanel = item.panel;
                }
            }

            setActivePanel((current) => (current === nextPanel ? current : nextPanel));
        };

        const scheduleUpdate = () => {
            if (frame) {
                return;
            }

            frame = window.requestAnimationFrame(() => {
                frame = 0;
                updatePanel();
            });
        };

        updatePanel();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);

        return () => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, []);

    return (
        <aside className="hidden xl:block">
            <div className="sticky top-20 ml-auto w-full max-w-[22rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                <AnimatePresence mode="wait" initial={false}>
                    {activePanel !== "hidden" ? (
                        <motion.div
                            key={activePanel}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateX(28px)" }}
                            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateX(0px)" }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateX(28px)" }}
                            transition={{ duration: reduce ? 0.16 : 0.34, ease: [0.23, 1, 0.32, 1] }}
                            className={activePanel === "contact" ? "max-w-[18rem]" : ""}
                        >
                            {activePanel === "contact" ? <ContactPanel /> : null}
                            {activePanel === "videface" ? <VideFacePanel /> : null}
                            {activePanel === "dragonfly" ? <DragonflyPanel /> : null}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </aside>
    );
}
