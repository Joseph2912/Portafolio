"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import type { TranslationDictionary } from "@/lib/translations";
import { cn } from "@/lib/utils";

const PROJECT = {
    name: "WhatsMyTask",
    stack: ["TypeScript", "Express", "Firebase", "Firestore", "Realtime DB", "Gemini API"],
    links: {
        github: "https://github.com/Joseph2912/whats-my-task",
        live: null as string | null,
    },
};

type ResultMetric = {
    value: number;
    prefix?: string;
    suffix?: string;
    labelKey: MetricId;
    tone: MetricTone;
};

type MetricId = keyof TranslationDictionary["projects"]["metrics"];
type StageId = keyof TranslationDictionary["projects"]["stageCards"];
type MetricTone = "impact" | "latency" | "system";
type InspectorNote = {
    eyebrow: string;
    title: string;
    description: string;
    related: string;
};
type InspectorState = { kind: "stage"; id: StageId } | { kind: "metric"; id: MetricId } | null;

const STEP_STYLES: Record<
    StageId,
    {
        badge: string;
        badgeActive: string;
        title: string;
        cardActive: string;
    }
> = {
    inbound: {
        badge: "border-border/70 bg-background text-foreground/75",
        badgeActive: "border-foreground/20 bg-foreground text-background",
        title: "text-foreground",
        cardActive:
            "border-teal-500/35 bg-muted/20 shadow-[0_0_0_1px_rgba(20,184,166,0.16)] dark:shadow-[0_0_0_1px_rgba(20,184,166,0.24)]",
    },
    filter: {
        badge: "border-border/70 bg-background text-foreground/75",
        badgeActive: "border-foreground/20 bg-foreground text-background",
        title: "text-foreground",
        cardActive:
            "border-teal-500/35 bg-muted/20 shadow-[0_0_0_1px_rgba(20,184,166,0.16)] dark:shadow-[0_0_0_1px_rgba(20,184,166,0.24)]",
    },
    buffer: {
        badge: "border-border/70 bg-background text-foreground/75",
        badgeActive: "border-foreground/20 bg-foreground text-background",
        title: "text-foreground",
        cardActive:
            "border-teal-500/35 bg-muted/20 shadow-[0_0_0_1px_rgba(20,184,166,0.16)] dark:shadow-[0_0_0_1px_rgba(20,184,166,0.24)]",
    },
    extract: {
        badge: "border-border/70 bg-background text-foreground/75",
        badgeActive: "border-foreground/20 bg-foreground text-background",
        title: "text-foreground",
        cardActive:
            "border-teal-500/35 bg-muted/20 shadow-[0_0_0_1px_rgba(20,184,166,0.16)] dark:shadow-[0_0_0_1px_rgba(20,184,166,0.24)]",
    },
};

const METRIC_STYLES: Record<
    MetricTone,
    {
        badge: string;
        activeCard: string;
    }
> = {
    impact: {
        badge: "border-border/70 bg-background text-foreground/75",
        activeCard:
            "border-teal-500/35 bg-muted/20 shadow-[0_0_0_1px_rgba(20,184,166,0.16)] dark:shadow-[0_0_0_1px_rgba(20,184,166,0.24)]",
    },
    latency: {
        badge: "border-border/70 bg-background text-foreground/75",
        activeCard:
            "border-teal-500/35 bg-muted/20 shadow-[0_0_0_1px_rgba(20,184,166,0.16)] dark:shadow-[0_0_0_1px_rgba(20,184,166,0.24)]",
    },
    system: {
        badge: "border-border/70 bg-background text-foreground/75",
        activeCard:
            "border-teal-500/35 bg-muted/20 shadow-[0_0_0_1px_rgba(20,184,166,0.16)] dark:shadow-[0_0_0_1px_rgba(20,184,166,0.24)]",
    },
};

const STAGE_META: readonly { id: StageId; relatedMetrics: readonly MetricId[] }[] = [
    { id: "inbound", relatedMetrics: ["filteringPipeline"] },
    { id: "filter", relatedMetrics: ["apiReduction", "filteringPipeline"] },
    { id: "buffer", relatedMetrics: ["contextBuffer", "filteringPipeline"] },
    { id: "extract", relatedMetrics: ["filteringPipeline"] },
] as const;

const METRIC_RELATIONS: Record<MetricId, readonly StageId[]> = {
    apiReduction: ["filter"],
    contextBuffer: ["buffer"],
    filteringPipeline: ["inbound", "filter", "buffer", "extract"],
};

const RESULTING_SYSTEM: readonly ResultMetric[] = [
    {
        value: 90,
        prefix: "~",
        suffix: "%",
        labelKey: "apiReduction",
        tone: "impact",
    },
    {
        value: 60,
        suffix: "s",
        labelKey: "contextBuffer",
        tone: "latency",
    },
    {
        value: 4,
        suffix: "-stage",
        labelKey: "filteringPipeline",
        tone: "system",
    },
] as const;

const METRIC_TONE_LABELS: Record<MetricTone, string> = {
    impact: "Impact",
    latency: "Buffer",
    system: "System",
};

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
};

function MetricCard({
    id,
    value,
    prefix,
    suffix,
    label,
    tone,
    reduce,
    note,
    highlighted,
    onOpenChange,
}: {
    id: MetricId;
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    tone: MetricTone;
    reduce: boolean | null;
    note: InspectorNote;
    highlighted: boolean;
    onOpenChange: (id: MetricId, open: boolean) => void;
}) {
    const ref = useRef<HTMLLIElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [displayValue, setDisplayValue] = useState(reduce ? value : 0);

    useEffect(() => {
        if (!inView) return;

        if (reduce) {
            setDisplayValue(value);
            return;
        }

        const controls = animate(0, value, {
            duration: 0.9,
            ease: [0.23, 1, 0.32, 1],
            onUpdate: (latest) => {
                setDisplayValue(Math.round(latest));
            },
        });

        return () => controls.stop();
    }, [inView, reduce, value]);

    const styles = METRIC_STYLES[tone];

    return (
        <HoverCard openDelay={120} closeDelay={90} onOpenChange={(open) => onOpenChange(id, open)}>
            <li ref={ref}>
                <HoverCardTrigger asChild>
                    <Card
                        size="sm"
                        tabIndex={0}
                        role="button"
                        className={cn(
                            "w-full bg-background text-left transition-[border-color,box-shadow,background-color] duration-200 ease-out hover:border-teal-500/25 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.1)] dark:hover:shadow-[0_0_0_1px_rgba(20,184,166,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
                            highlighted ? styles.activeCard : "",
                        )}
                    >
                        <CardHeader className="gap-2 border-b pb-4">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className={styles.badge}>
                                    {METRIC_TONE_LABELS[tone]}
                                </Badge>
                            </div>
                            <CardDescription>{label}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                                {prefix}
                                {displayValue}
                                {suffix}
                            </p>
                        </CardContent>
                    </Card>
                </HoverCardTrigger>
            </li>
            <HoverCardContent align="start" className="w-[20rem]">
                <InspectorPanel note={note} />
            </HoverCardContent>
        </HoverCard>
    );
}

function InspectorPanel({ note }: { note: InspectorNote }) {
    return (
        <div className="flex flex-col gap-3">
            <Badge variant="outline" className="w-fit">
                {note.eyebrow}
            </Badge>
            <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-foreground">{note.title}</h4>
                <p className="text-sm leading-6 text-muted-foreground">{note.description}</p>
            </div>
            <Separator />
            <p className="text-xs leading-5 text-muted-foreground">{note.related}</p>
        </div>
    );
}

function ProcessArtifact({
    label,
    title,
    detail,
    variant,
    reduce,
    language,
}: {
    label: string;
    title: string;
    detail: string;
    variant: "traffic" | "buffer" | "pipeline";
    reduce: boolean | null;
    language: "en" | "es";
}) {
    const notificationPreview =
        language === "es"
            ? "Cliente: necesito una tarea para revisar la valvula del lote 3"
            : "Client: I need a task to inspect valve line 3";

    const extractionLine =
        language === "es"
            ? "Gemini: detecto que esta pidiendo una tarea de revision para la valvula del lote 3"
            : "Gemini: this looks like a task request to inspect valve line 3";

    const taskChip =
        language === "es" ? "Tarea detectada: revisar valvula del lote 3" : "Task detected: inspect valve line 3";

    const todoHeading = language === "es" ? "To do" : "To do";
    const todoLine = language === "es" ? "Revisar valvula del lote 3" : "Inspect valve line 3";

    return (
        <Card size="sm" className="bg-background">
            <CardHeader className="gap-2 border-b pb-4">
                <Badge
                    variant="outline"
                    className="w-fit border-border/70 bg-background text-[10px] text-foreground/75"
                >
                    {label}
                </Badge>
                <CardTitle className="text-sm">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="mb-4 rounded-[var(--radius-control)] border border-border/60 bg-muted/20 p-3">
                    {variant === "traffic" && (
                        <div className="flex flex-col gap-3">
                            <motion.div
                                initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                                animate={
                                    reduce
                                        ? undefined
                                        : {
                                              opacity: [0.85, 1, 1, 0.85],
                                              y: [4, 0, 0, 4],
                                              scale: [0.99, 1, 1, 0.99],
                                          }
                                }
                                transition={
                                    reduce
                                        ? undefined
                                        : {
                                              duration: 3.2,
                                              ease: [0.23, 1, 0.32, 1],
                                              repeat: Number.POSITIVE_INFINITY,
                                              repeatDelay: 0.4,
                                          }
                                }
                                className="rounded-[var(--radius-control)] border border-teal-500/25 bg-background px-3 py-3 shadow-[0_12px_24px_-18px_rgba(20,184,166,0.5)]"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="flex size-6 items-center justify-center rounded-full bg-teal-500/15 text-[10px] font-semibold text-teal-700 dark:text-teal-300">
                                            WA
                                        </span>
                                        <span className="text-[11px] font-medium text-foreground/80">WhatsApp</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">now</span>
                                </div>

                                <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
                                    {notificationPreview}
                                </p>
                            </motion.div>

                            <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                                <span className="rounded-full border border-border/60 bg-background px-2 py-1 opacity-70">
                                    ok
                                </span>
                                <span className="rounded-full border border-border/60 bg-background px-2 py-1 opacity-55">
                                    + audio
                                </span>
                                <span className="rounded-full border border-border/60 bg-background px-2 py-1 opacity-40">
                                    unknown sender
                                </span>
                            </div>
                        </div>
                    )}
                    {variant === "buffer" && (
                        <div className="space-y-3">
                            <div className="grid grid-cols-6 gap-1">
                                {[0, 1, 2, 3, 4, 5].map((item) => (
                                    <motion.div
                                        key={item}
                                        className="h-8 rounded-[var(--radius-control)] border border-border/50 bg-background"
                                        animate={
                                            reduce
                                                ? item >= 1 && item <= 4
                                                    ? {
                                                          backgroundColor: "rgba(20,184,166,0.14)",
                                                          borderColor: "rgba(20,184,166,0.2)",
                                                      }
                                                    : undefined
                                                : {
                                                      backgroundColor: [
                                                          "rgba(255,255,255,0)",
                                                          "rgba(20,184,166,0.18)",
                                                          "rgba(255,255,255,0)",
                                                      ],
                                                      borderColor: [
                                                          "rgba(0,0,0,0.08)",
                                                          "rgba(20,184,166,0.3)",
                                                          "rgba(0,0,0,0.08)",
                                                      ],
                                                  }
                                        }
                                        transition={
                                            reduce
                                                ? undefined
                                                : {
                                                      duration: 1.4,
                                                      ease: "easeInOut",
                                                      repeat: Number.POSITIVE_INFINITY,
                                                      delay: item * 0.12,
                                                      repeatDelay: 0.2,
                                                  }
                                        }
                                    />
                                ))}
                            </div>

                            <div className="overflow-hidden rounded-full border border-border/60 bg-background p-1">
                                <motion.div
                                    className="h-2 w-full origin-left rounded-full bg-teal-500/70"
                                    initial={reduce ? false : { scaleX: 0.22 }}
                                    animate={reduce ? { scaleX: 0.72 } : { scaleX: [0.22, 0.48, 0.72, 0.4] }}
                                    transition={
                                        reduce
                                            ? undefined
                                            : {
                                                  duration: 2.8,
                                                  ease: [0.23, 1, 0.32, 1],
                                                  repeat: Number.POSITIVE_INFINITY,
                                              }
                                    }
                                />
                            </div>
                        </div>
                    )}
                    {variant === "pipeline" && (
                        <div className="space-y-3">
                            <div className="grid gap-2 sm:grid-cols-4">
                                {["In", "Filter", "Buffer", "Extract"].map((step, index) => (
                                    <div key={step} className="flex items-center gap-2">
                                        <motion.div
                                            className="flex h-8 flex-1 items-center justify-center rounded-[var(--radius-control)] border border-border/60 bg-background text-[11px] text-muted-foreground"
                                            animate={
                                                reduce || step !== "Extract"
                                                    ? undefined
                                                    : {
                                                          borderColor: [
                                                              "rgba(0,0,0,0.08)",
                                                              "rgba(20,184,166,0.32)",
                                                              "rgba(0,0,0,0.08)",
                                                          ],
                                                          backgroundColor: [
                                                              "rgba(255,255,255,0)",
                                                              "rgba(20,184,166,0.12)",
                                                              "rgba(255,255,255,0)",
                                                          ],
                                                      }
                                            }
                                            transition={
                                                reduce || step !== "Extract"
                                                    ? undefined
                                                    : {
                                                          duration: 2.2,
                                                          repeat: Number.POSITIVE_INFINITY,
                                                          ease: "easeInOut",
                                                      }
                                            }
                                        >
                                            {step}
                                        </motion.div>
                                        {index < 3 && <div className="hidden h-px w-4 bg-border sm:block" />}
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-[var(--radius-control)] border border-border/60 bg-background px-3 py-3">
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-teal-500" />
                                    <span className="text-[11px] font-medium text-foreground/80">Gemini</span>
                                </div>

                                <div className="overflow-hidden rounded-[10px] bg-muted/25 px-3 py-2 font-mono text-[11px] leading-5 text-muted-foreground">
                                    <div className="flex items-start">
                                        <motion.span
                                            className="block overflow-hidden whitespace-nowrap"
                                            initial={reduce ? false : { width: 0 }}
                                            animate={reduce ? { width: "100%" } : { width: [0, "100%", "100%", 0] }}
                                            transition={
                                                reduce
                                                    ? undefined
                                                    : {
                                                          duration: 4.2,
                                                          ease: [0.23, 1, 0.32, 1],
                                                          repeat: Number.POSITIVE_INFINITY,
                                                          repeatDelay: 0.6,
                                                      }
                                            }
                                        >
                                            {extractionLine}
                                        </motion.span>
                                        {!reduce && (
                                            <motion.span
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
                                                className="ml-0.5"
                                            >
                                                |
                                            </motion.span>
                                        )}
                                    </div>
                                </div>

                                <motion.div
                                    initial={reduce ? false : { opacity: 0, y: 6 }}
                                    animate={
                                        reduce ? { opacity: 1, y: 0 } : { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 0] }
                                    }
                                    transition={
                                        reduce
                                            ? undefined
                                            : {
                                                  duration: 4.2,
                                                  ease: [0.23, 1, 0.32, 1],
                                                  repeat: Number.POSITIVE_INFINITY,
                                                  repeatDelay: 0.6,
                                              }
                                    }
                                    className="mt-3 inline-flex rounded-full border border-teal-500/25 bg-teal-500/8 px-3 py-2 text-[11px] text-teal-700 dark:text-teal-300"
                                >
                                    {taskChip}
                                </motion.div>

                                <div className="mt-3 rounded-[10px] border border-border/60 bg-muted/15 p-3">
                                    <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                        {todoHeading}
                                    </div>

                                    <motion.div
                                        initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                                        animate={
                                            reduce
                                                ? { opacity: 1, y: 0, scale: 1 }
                                                : { opacity: [0, 0, 1, 1], y: [8, 8, 0, 0], scale: [0.98, 0.98, 1, 1] }
                                        }
                                        transition={
                                            reduce
                                                ? undefined
                                                : {
                                                      duration: 4.2,
                                                      ease: [0.23, 1, 0.32, 1],
                                                      repeat: Number.POSITIVE_INFINITY,
                                                      repeatDelay: 0.6,
                                                  }
                                        }
                                        className="flex items-center gap-3 rounded-[var(--radius-control)] border border-border/60 bg-background px-3 py-3"
                                    >
                                        <motion.span
                                            className="flex size-5 items-center justify-center rounded-full border border-teal-500/35"
                                            animate={
                                                reduce
                                                    ? {
                                                          backgroundColor: "rgba(20,184,166,0.12)",
                                                          borderColor: "rgba(20,184,166,0.35)",
                                                      }
                                                    : {
                                                          backgroundColor: [
                                                              "rgba(255,255,255,0)",
                                                              "rgba(255,255,255,0)",
                                                              "rgba(20,184,166,0.12)",
                                                              "rgba(20,184,166,0.12)",
                                                          ],
                                                          borderColor: [
                                                              "rgba(20,184,166,0.22)",
                                                              "rgba(20,184,166,0.22)",
                                                              "rgba(20,184,166,0.35)",
                                                              "rgba(20,184,166,0.35)",
                                                          ],
                                                      }
                                            }
                                            transition={
                                                reduce
                                                    ? undefined
                                                    : {
                                                          duration: 4.2,
                                                          repeat: Number.POSITIVE_INFINITY,
                                                          repeatDelay: 0.6,
                                                      }
                                            }
                                        >
                                            <motion.span
                                                animate={
                                                    reduce
                                                        ? { opacity: 1, scale: 1 }
                                                        : { opacity: [0, 0, 1, 1], scale: [0.7, 0.7, 1, 1] }
                                                }
                                                transition={
                                                    reduce
                                                        ? undefined
                                                        : {
                                                              duration: 4.2,
                                                              repeat: Number.POSITIVE_INFINITY,
                                                              repeatDelay: 0.6,
                                                          }
                                                }
                                                className="text-[11px] text-teal-600 dark:text-teal-300"
                                            >
                                                ✓
                                            </motion.span>
                                        </motion.span>

                                        <motion.span
                                            animate={
                                                reduce
                                                    ? { opacity: 1, x: 0 }
                                                    : { opacity: [0, 0, 1, 1], x: [8, 8, 0, 0] }
                                            }
                                            transition={
                                                reduce
                                                    ? undefined
                                                    : {
                                                          duration: 4.2,
                                                          repeat: Number.POSITIVE_INFINITY,
                                                          repeatDelay: 0.6,
                                                      }
                                            }
                                            className="text-[11px] text-foreground/82"
                                        >
                                            {todoLine}
                                        </motion.span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
            </CardContent>
        </Card>
    );
}

export default function Projects() {
    const reduce = useReducedMotion();
    const { language, dictionary } = useLanguage();
    const [activeInspector, setActiveInspector] = useState<InspectorState>(null);

    const updateInspector = (next: InspectorState, open: boolean) => {
        setActiveInspector((current) => {
            if (open) {
                return next;
            }

            if (!next || !current) {
                return null;
            }

            return current.kind === next.kind && current.id === next.id ? null : current;
        });
    };

    const isStageHighlighted = (stageId: StageId) => {
        if (!activeInspector) {
            return false;
        }

        if (activeInspector.kind === "stage") {
            return activeInspector.id === stageId;
        }

        return METRIC_RELATIONS[activeInspector.id].includes(stageId);
    };

    const isMetricHighlighted = (metricId: MetricId) => {
        if (!activeInspector) {
            return false;
        }

        if (activeInspector.kind === "metric") {
            return activeInspector.id === metricId;
        }

        return STAGE_META.find((stage) => stage.id === activeInspector.id)?.relatedMetrics.includes(metricId) ?? false;
    };

    return (
        <AnimatedSection>
            <section id="projects" className="scroll-mt-24">
                <motion.div
                    variants={reduce ? undefined : containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <Card className="panel-surface-feature rounded-[var(--radius-panel)] bg-card">
                        <motion.div variants={reduce ? undefined : itemVariant}>
                            <CardHeader className="gap-2 border-b px-5 pb-6 pt-6 sm:px-6">
                                <p className="technical-label text-[11px] font-medium uppercase text-muted-foreground">
                                    {dictionary.projects.sectionLabel}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                                    {/* <span>{dictionary.projects.readTime}</span> */}
                                </div>
                                <CardTitle>{PROJECT.name}</CardTitle>
                                <CardDescription>{dictionary.projects.description}</CardDescription>
                                <CardAction className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="border-teal-500/25 text-[10px] text-teal-700 dark:text-teal-300"
                                    >
                                        {dictionary.projects.status}
                                    </Badge>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
                                        className="text-muted-foreground hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300"
                                    >
                                        <a
                                            href={PROJECT.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="View source on GitHub"
                                        >
                                            <GithubIcon size={14} />
                                        </a>
                                    </Button>
                                    {PROJECT.links.live && (
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="icon"
                                            className="text-muted-foreground hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300"
                                        >
                                            <a
                                                href={PROJECT.links.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="View live project"
                                            >
                                                <ExternalLink size={14} />
                                            </a>
                                        </Button>
                                    )}
                                </CardAction>
                            </CardHeader>
                        </motion.div>

                        <CardContent className="px-5 pb-6 pt-8 sm:px-6">
                            <div className="flex flex-col gap-8">
                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <div className="rounded-[var(--radius-control)] border border-border/60 bg-muted/20 px-4 py-4">
                                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                            {dictionary.projects.roleTitle}
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {dictionary.projects.role}
                                        </p>
                                    </div>
                                </motion.div>

                                <Separator />

                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-sm font-medium text-foreground/80">
                                            {dictionary.projects.problemTitle}
                                        </p>
                                        <p className="max-w-2xl text-sm text-muted-foreground">
                                            {dictionary.projects.problem}
                                        </p>
                                    </div>
                                </motion.div>

                                <Separator />

                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-sm font-medium text-foreground/80">
                                            {dictionary.projects.keyDecisionsTitle}
                                        </p>
                                        <div className="grid gap-3 lg:grid-cols-3">
                                            {dictionary.projects.decisions.map((decision) => (
                                                <Card key={decision.title} size="sm" className="bg-background">
                                                    <CardHeader className="gap-2 border-b pb-4">
                                                        <CardTitle className="text-sm">{decision.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="pt-4 text-sm text-muted-foreground">
                                                        <p className="leading-relaxed">{decision.rationale}</p>
                                                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                                                            <span className="font-medium text-foreground/80">
                                                                {dictionary.projects.alternativeLabel}:
                                                            </span>{" "}
                                                            {decision.alternative}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                <Separator />

                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <Card size="sm" className="bg-background">
                                        <CardHeader className="gap-2 border-b pb-4">
                                            <CardTitle className="text-sm">
                                                {dictionary.projects.solutionTitle}
                                            </CardTitle>
                                            <CardDescription>{dictionary.projects.interactionHint}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <ol className="grid gap-3 md:grid-cols-2">
                                                {STAGE_META.map((stage, index) => {
                                                    const item = dictionary.projects.pipeline[index];
                                                    const highlighted = isStageHighlighted(stage.id);
                                                    const note = dictionary.projects.stageCards[stage.id];
                                                    const styles = STEP_STYLES[stage.id];

                                                    return (
                                                        <HoverCard
                                                            key={`${item.step}-${item.title}`}
                                                            openDelay={120}
                                                            closeDelay={90}
                                                            onOpenChange={(open) =>
                                                                updateInspector({ kind: "stage", id: stage.id }, open)
                                                            }
                                                        >
                                                            <li>
                                                                <HoverCardTrigger asChild>
                                                                    <Card
                                                                        size="sm"
                                                                        tabIndex={0}
                                                                        role="button"
                                                                        className={cn(
                                                                            "w-full bg-card text-left transition-[border-color,box-shadow,background-color] duration-200 ease-out hover:border-teal-500/25 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.1)] dark:hover:shadow-[0_0_0_1px_rgba(20,184,166,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
                                                                            highlighted ? styles.cardActive : "",
                                                                        )}
                                                                    >
                                                                        <CardHeader className="gap-2 border-b pb-4">
                                                                            <div className="flex items-center gap-2">
                                                                                <Badge
                                                                                    variant="outline"
                                                                                    className={cn(
                                                                                        styles.badge,
                                                                                        highlighted &&
                                                                                            styles.badgeActive,
                                                                                    )}
                                                                                >
                                                                                    {item.step}
                                                                                </Badge>
                                                                                <CardTitle
                                                                                    className={cn(
                                                                                        "text-sm transition-colors duration-200 ease-out",
                                                                                        styles.title,
                                                                                    )}
                                                                                >
                                                                                    {item.title}
                                                                                </CardTitle>
                                                                            </div>
                                                                        </CardHeader>
                                                                        <CardContent className="pt-4 text-sm text-muted-foreground">
                                                                            {item.detail}
                                                                        </CardContent>
                                                                    </Card>
                                                                </HoverCardTrigger>
                                                            </li>
                                                            <HoverCardContent align="start" className="w-[20rem]">
                                                                <InspectorPanel note={note} />
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    );
                                                })}
                                            </ol>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <Separator />

                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-sm font-medium text-foreground/80">
                                            {dictionary.projects.constraintsTitle}
                                        </p>
                                        <ul className="flex max-w-2xl flex-col gap-2 text-sm text-muted-foreground">
                                            {dictionary.projects.constraints.map((item, index) => (
                                                <li key={index} className="leading-relaxed">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                <Separator />

                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-sm font-medium text-foreground/80">
                                            {dictionary.projects.validationTitle}
                                        </p>
                                        <ul className="flex max-w-2xl flex-col gap-2 text-sm text-muted-foreground">
                                            {dictionary.projects.validation.map((item, index) => (
                                                <li key={index} className="leading-relaxed">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                <Separator />

                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <div className="flex flex-col gap-4">
                                        <p className="text-sm font-medium text-foreground/80">
                                            {dictionary.projects.processEvidenceTitle}
                                        </p>
                                        <div className="grid gap-4 lg:grid-cols-3">
                                            {dictionary.projects.processEvidence.map((artifact, index) => (
                                                <ProcessArtifact
                                                    key={artifact.title}
                                                    label={artifact.label}
                                                    title={artifact.title}
                                                    detail={artifact.detail}
                                                    reduce={reduce}
                                                    language={language}
                                                    variant={
                                                        index === 0 ? "traffic" : index === 1 ? "buffer" : "pipeline"
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                <Separator />

                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <div className="flex flex-col gap-4">
                                        <p className="text-sm font-medium text-foreground/80">
                                            {dictionary.projects.resultingSystemTitle}
                                        </p>
                                        <p className="max-w-2xl text-sm text-muted-foreground">
                                            {dictionary.projects.resultSummary}
                                        </p>
                                        <ul className="grid gap-4 sm:grid-cols-3">
                                            {RESULTING_SYSTEM.map((metric) => (
                                                <MetricCard
                                                    key={metric.labelKey}
                                                    id={metric.labelKey}
                                                    value={metric.value}
                                                    prefix={metric.prefix}
                                                    suffix={metric.suffix}
                                                    label={dictionary.projects.metrics[metric.labelKey]}
                                                    tone={metric.tone}
                                                    reduce={reduce}
                                                    note={dictionary.projects.metricCards[metric.labelKey]}
                                                    highlighted={isMetricHighlighted(metric.labelKey)}
                                                    onOpenChange={(id, open) =>
                                                        updateInspector({ kind: "metric", id }, open)
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                <Separator />

                                <motion.div variants={reduce ? undefined : itemVariant}>
                                    <Card size="sm" className="bg-background">
                                        <CardHeader className="gap-2 border-b pb-4">
                                            <CardTitle className="technical-label text-sm">
                                                {dictionary.projects.tradeoffTitle}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4 text-sm text-muted-foreground">
                                            <span className="technical-copy">{dictionary.projects.tradeoff}</span>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </CardContent>

                        <motion.div variants={reduce ? undefined : itemVariant}>
                            <CardFooter className="flex flex-wrap gap-2 border-t bg-muted/30 px-5 py-5 sm:px-6">
                                {PROJECT.stack.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="text-[10px]">
                                        {tech}
                                    </Badge>
                                ))}
                            </CardFooter>
                        </motion.div>
                    </Card>
                </motion.div>
            </section>
        </AnimatedSection>
    );
}
