"use client";

import { useLanguage } from "@/components/language-provider";

export default function Principles() {
    const { dictionary } = useLanguage();
    const principles = dictionary.principles.items;

    return (
        <section id="principles" className="panel-surface panel-surface-ghost scroll-mt-24">
            <span className="technical-label mb-8 block text-xs font-medium uppercase text-muted-foreground">
                {dictionary.principles.title}
            </span>

            <div className="flex flex-col gap-6">
                {principles.map((p) => (
                    <article
                        key={p.title}
                        className="rounded-[var(--radius-surface)] border border-border/50 bg-card/70 px-5 py-5 backdrop-blur-[2px] sm:px-6 sm:py-6"
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="technical-label rounded-full border border-border/50 bg-transparent px-2.5 py-1 text-[10px] font-medium uppercase text-muted-foreground">
                                {p.label}
                            </span>
                            <h3 className="text-sm font-semibold text-foreground sm:text-base">{p.title}</h3>
                        </div>

                        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <p className="technical-label text-[11px] font-medium uppercase text-muted-foreground">
                                    {dictionary.principles.labels.context}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.context}</p>
                            </div>

                            <div>
                                <p className="technical-label text-[11px] font-medium uppercase text-muted-foreground">
                                    {dictionary.principles.labels.decision}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.decision}</p>
                            </div>

                            <div>
                                <p className="technical-label text-[11px] font-medium uppercase text-muted-foreground">
                                    {dictionary.principles.labels.tradeoff}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.tradeoff}</p>
                            </div>

                            <div>
                                <p className="technical-label text-[11px] font-medium uppercase text-muted-foreground">
                                    {dictionary.principles.labels.result}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.result}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
