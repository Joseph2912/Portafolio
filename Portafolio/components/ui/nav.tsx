"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { key: "about", href: "#about" },
    { key: "experience", href: "#experience" },
    { key: "projects", href: "#projects" },
    { key: "principles", href: "#principles" },
    { key: "stack", href: "#stack" },
    { key: "contact", href: "#contact" },
] as const;

export function Nav() {
    const { dictionary } = useLanguage();
    const [active, setActive] = useState("about");
    const [mobileOpen, setMobileOpen] = useState(false);
    const pendingSectionRef = useRef<string | null>(null);
    const pendingFrameRef = useRef<number | null>(null);
    const pendingTimeoutRef = useRef<number | null>(null);
    const scrollAnimationFrameRef = useRef<number | null>(null);
    const scrollAnimationStartRef = useRef<number | null>(null);

    const clearScrollAnimation = useCallback(() => {
        if (scrollAnimationFrameRef.current !== null) {
            window.cancelAnimationFrame(scrollAnimationFrameRef.current);
            scrollAnimationFrameRef.current = null;
        }

        scrollAnimationStartRef.current = null;
    }, []);

    const clearPendingSection = useCallback(() => {
        pendingSectionRef.current = null;

        if (pendingFrameRef.current !== null) {
            window.cancelAnimationFrame(pendingFrameRef.current);
            pendingFrameRef.current = null;
        }

        if (pendingTimeoutRef.current !== null) {
            window.clearTimeout(pendingTimeoutRef.current);
            pendingTimeoutRef.current = null;
        }
    }, []);

    const trackProgrammaticScroll = useCallback(
        (targetId: string, top: number) => {
            clearPendingSection();
            pendingSectionRef.current = targetId;

            const check = () => {
                if (Math.abs(window.scrollY - top) <= 4) {
                    clearPendingSection();
                    return;
                }

                pendingFrameRef.current = window.requestAnimationFrame(check);
            };

            pendingFrameRef.current = window.requestAnimationFrame(check);
            pendingTimeoutRef.current = window.setTimeout(() => {
                clearPendingSection();
            }, 1200);
        },
        [clearPendingSection],
    );

    const scrollToSection = useCallback(
        (href: string) => {
            const el = document.querySelector<HTMLElement>(href);
            if (!el) return;

            const id = href.slice(1);
            const top = el.getBoundingClientRect().top + window.scrollY - 88;
            const startTop = window.scrollY;
            const distance = top - startTop;
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            setActive(id);
            trackProgrammaticScroll(id, top);
            window.history.replaceState(null, "", href);

            if (reduceMotion || Math.abs(distance) < 4) {
                clearScrollAnimation();
                window.scrollTo({ top });
                return;
            }

            clearScrollAnimation();

            const duration = Math.min(720, Math.max(460, Math.abs(distance) * 0.45));
            const step = (timestamp: number) => {
                if (scrollAnimationStartRef.current === null) {
                    scrollAnimationStartRef.current = timestamp;
                }

                const elapsed = timestamp - scrollAnimationStartRef.current;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);

                window.scrollTo({ top: startTop + distance * eased });

                if (progress < 1) {
                    scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
                    return;
                }

                clearScrollAnimation();
            };

            scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
        },
        [clearScrollAnimation, trackProgrammaticScroll],
    );

    const handleIntersection = useCallback(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length === 0) {
                    return;
                }

                if (pendingSectionRef.current) {
                    const pendingEntry = visible.find((entry) => entry.target.id === pendingSectionRef.current);

                    if (pendingEntry) {
                        setActive(pendingEntry.target.id);
                        clearPendingSection();
                    }

                    return;
                }

                setActive(visible[0].target.id);
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
        );

        NAV_ITEMS.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });

        return observer;
    }, [clearPendingSection]);

    useEffect(() => {
        const observer = handleIntersection();
        return () => {
            clearScrollAnimation();
            clearPendingSection();
            observer.disconnect();
        };
    }, [clearPendingSection, clearScrollAnimation, handleIntersection]);

    // Close mobile nav on resize to desktop
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const handler = () => {
            if (mq.matches) setMobileOpen(false);
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/55">
            <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-10">
                <a
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#about");
                    }}
                    className="font-mono text-sm font-medium text-foreground [transition-property:color] duration-150 ease-out"
                >
                    JC
                </a>

                {/* Desktop links */}
                <div className="hidden items-center gap-2 md:flex">
                    {NAV_ITEMS.map(({ key, href }) => {
                        const id = href.slice(1);
                        const isActive = active === id;
                        return (
                            <a
                                key={id}
                                href={href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(href);
                                }}
                                className={cn(
                                    "relative px-3 py-2 text-xs font-medium [transition-property:color] duration-150 ease-out",
                                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                {dictionary.nav[key]}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className="absolute inset-x-1 -bottom-[7px] h-px bg-foreground"
                                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-1">
                    <LanguageToggle />
                    <ThemeToggle />

                    {/* Mobile hamburger */}
                    <Button
                        onClick={() => setMobileOpen((v) => !v)}
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground md:hidden"
                        aria-label={mobileOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </Button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                        exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                        className="border-t border-border/50 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 md:hidden"
                    >
                        <div className="mx-auto flex max-w-2xl flex-col gap-2 px-6 py-4">
                            {NAV_ITEMS.map(({ key, href }) => {
                                const id = href.slice(1);
                                const isActive = active === id;
                                return (
                                    <a
                                        key={id}
                                        href={href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMobileOpen(false);
                                            scrollToSection(href);
                                        }}
                                        className={cn(
                                            "rounded-[var(--radius-control)] px-4 py-3 text-sm font-medium [transition-property:color,background-color] duration-150 ease-out",
                                            isActive
                                                ? "bg-accent text-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-foreground",
                                        )}
                                    >
                                        {dictionary.nav[key]}
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
