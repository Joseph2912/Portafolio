"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileDown, MessageCircle } from "lucide-react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { getWhatsAppHref, RESUME_DOWNLOAD_PATH } from "@/lib/contact-links";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const LINKS: { href: string; icon: IconComponent; key: "github" | "linkedin" }[] = [
    { href: "https://github.com/Joseph2912", icon: GithubIcon, key: "github" },
    { href: "https://www.linkedin.com/in/joseph-cuartas", icon: LinkedinIcon, key: "linkedin" },
];

const LINK_STYLES: Record<(typeof LINKS)[number]["key"], string> = {
    linkedin:
        "border-border/70 bg-background text-foreground/80 hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300",
    github: "border-border/70 bg-background text-foreground/80 hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300",
};

const PROOF_POINTS = [
    {
        value: 300,
        prefix: undefined,
        suffix: "+",
        labelIndex: 0,
    },
    {
        value: 1,
        prefix: "<",
        suffix: "s",
        labelIndex: 1,
    },
    {
        value: 90,
        prefix: "~",
        suffix: "%",
        labelIndex: 2,
    },
] as const;

function AnimatedProofValue({
    value,
    prefix,
    suffix,
    active,
}: {
    value: number;
    prefix?: string;
    suffix?: string;
    active: boolean;
}) {
    const reduce = useReducedMotion() ?? false;
    const [displayValue, setDisplayValue] = useState(reduce ? value : 0);

    useEffect(() => {
        if (!active) {
            return;
        }

        if (reduce) {
            setDisplayValue(value);
            return;
        }

        const controls = animate(0, value, {
            duration: 1,
            ease: [0.23, 1, 0.32, 1],
            onUpdate: (latest) => {
                setDisplayValue(Math.round(latest));
            },
        });

        return () => controls.stop();
    }, [active, reduce, value]);

    return (
        <span>
            {prefix}
            {displayValue}
            {suffix}
        </span>
    );
}

export default function Hero() {
    const { language, dictionary } = useLanguage();
    const whatsappHref = getWhatsAppHref(language);
    const metricsRef = useRef<HTMLUListElement | null>(null);
    const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

    return (
        <section id="about" className="panel-surface panel-surface-hero relative scroll-mt-24 overflow-hidden">
            <div className="relative z-10 mb-8">
                <span className="technical-label inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-background px-4 py-2 text-[11px] font-medium text-foreground/80">
                    <span className="availability-dot inline-flex size-2 rounded-full bg-teal-500" />
                    {dictionary.hero.availability}
                </span>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
                <p className="technical-label text-[11px] font-medium uppercase text-muted-foreground">
                    {dictionary.hero.role}
                </p>

                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-foreground text-balance sm:text-5xl md:text-6xl xl:text-7xl">
                    Joseph Cuartas
                </h1>

                <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="border-border/70 bg-background text-foreground/80">
                        {dictionary.hero.companyBadge}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{dictionary.hero.systemsLabel}</span>
                </div>

                <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {dictionary.hero.summary}
                </p>
            </div>

            {/* <ul ref={metricsRef} className="relative z-10 mt-8 grid gap-4 sm:grid-cols-3">
                {PROOF_POINTS.map((item) => (
                    <motion.li
                        key={item.labelIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={metricsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.42, delay: item.labelIndex * 0.08, ease: [0.23, 1, 0.32, 1] }}
                        className="rounded-[var(--radius-surface)] border border-border/70 bg-background px-5 py-5"
                    >
                        <p className="text-3xl font-semibold tracking-tight text-teal-600 tabular-nums dark:text-teal-400">
                            <AnimatedProofValue
                                value={item.value}
                                prefix={item.prefix}
                                suffix={item.suffix}
                                active={metricsInView}
                            />
                        </p>
                        <motion.div
                            className="mt-3 h-px origin-left bg-teal-500/35"
                            initial={{ scaleX: 0 }}
                            animate={metricsInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{
                                duration: 0.55,
                                delay: item.labelIndex * 0.1 + 0.15,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                        />
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {dictionary.hero.proofPoints[item.labelIndex]}
                        </p>
                    </motion.li>
                ))}
            </ul> */}

            <div className="relative z-10 mt-8">
                <p className="technical-label text-[11px] font-medium uppercase text-muted-foreground">
                    {/* {dictionary.hero.caseStudiesLabel} */}
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {dictionary.hero.caseStudies.map((item) => (
                        <a
                            key={item.title}
                            href={item.href}
                            className="group rounded-[var(--radius-surface)] border border-border/70 bg-background px-5 py-5 [transition-property:border-color,background-color,transform] duration-150 ease-out hover:border-teal-500/35 hover:bg-teal-500/5"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="technical-label text-[10px] font-medium uppercase text-muted-foreground">
                                    {/* {item.type} */}
                                </span>
                                {/* <span className="text-[11px] text-muted-foreground">{item.readTime}</span> */}
                            </div>

                            <h2 className="mt-3 text-sm font-semibold leading-6 text-foreground sm:text-[15px]">
                                {item.title}
                            </h2>

                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

                            <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-foreground/80">
                                {dictionary.hero.caseStudiesCta}
                                <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-teal-500 px-4 text-zinc-950 hover:bg-teal-400 focus-visible:ring-teal-500/30"
                >
                    <a href="#contact">
                        {dictionary.common.actions.contact}
                        <ArrowRight className="transition-transform duration-150 group-hover/button:translate-x-0.5" />
                    </a>
                </Button>

                <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-border/70 text-muted-foreground hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300"
                >
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                        <MessageCircle />
                        {dictionary.common.actions.whatsapp}
                    </a>
                </Button>

                <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-border/70 text-muted-foreground hover:border-teal-500/35 hover:bg-teal-500/5 hover:text-teal-700 dark:hover:text-teal-300"
                >
                    <a href={RESUME_DOWNLOAD_PATH} download>
                        <FileDown />
                        {dictionary.common.actions.resume}
                    </a>
                </Button>
            </div>

            <div className="relative z-10 mt-4 flex flex-wrap gap-3">
                {LINKS.map(({ href, icon: Icon, key }) => (
                    <a
                        key={key}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-xs font-medium [transition-property:color,background-color,border-color,transform] duration-150 ease-out ${LINK_STYLES[key]}`}
                    >
                        <Icon size={14} />
                        {dictionary.common.social[key]}
                    </a>
                ))}
            </div>
        </section>
    );
}
