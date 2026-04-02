"use client";

import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
    const { dictionary } = useLanguage();

    return (
        <section id="experience" className="panel-surface panel-surface-flat scroll-mt-24">
            <span className="mb-8 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {dictionary.experience.title}
            </span>

            <div className="relative flex flex-col gap-8">
                <div className="absolute left-[4px] top-3 hidden h-[calc(100%-24px)] w-px bg-border md:block" />

                {dictionary.experience.jobs.map((job) => {
                    const subtitle = "subtitle" in job && typeof job.subtitle === "string" ? job.subtitle : null;
                    const tradeoff = "tradeoff" in job && typeof job.tradeoff === "string" ? job.tradeoff : null;
                    const validation =
                        "validation" in job && typeof job.validation === "string" ? job.validation : null;
                    const roleScope = "roleScope" in job && typeof job.roleScope === "string" ? job.roleScope : null;
                    const decisions: Array<{ title: string; rationale: string; alternative: string }> =
                        "decisions" in job && Array.isArray(job.decisions) ? Array.from(job.decisions) : [];
                    const caseType = "caseType" in job && typeof job.caseType === "string" ? job.caseType : null;
                    const readTime = "readTime" in job && typeof job.readTime === "string" ? job.readTime : null;
                    const articleId = "id" in job && typeof job.id === "string" ? job.id : undefined;

                    return (
                        <article
                            key={job.company}
                            id={articleId}
                            className="relative rounded-[var(--radius-surface)] border border-border/70 bg-background px-5 py-6 transition-colors duration-150 ease-out hover:border-foreground/20 md:pl-10"
                        >
                            <div className="absolute left-[4px] top-7 hidden size-2 -translate-x-1/2 rounded-full border-2 border-background bg-foreground/85 md:block" />

                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                {caseType && (
                                    <Badge
                                        variant="outline"
                                        className="border-border/70 bg-background text-[10px] text-foreground/80"
                                    >
                                        {caseType}
                                    </Badge>
                                )}
                                {readTime && <span className="text-[11px] text-muted-foreground">{readTime}</span>}
                            </div>

                            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
                                <h2 className="font-medium text-foreground">
                                    {job.company}
                                    {subtitle && <span className="text-muted-foreground"> — {subtitle}</span>}
                                </h2>
                                <div className="flex shrink-0 items-center gap-2">
                                    {job.current && (
                                        <Badge variant="outline" className="border-border/70 text-foreground/80">
                                            {dictionary.experience.current}
                                        </Badge>
                                    )}
                                    <span className="text-sm text-muted-foreground">{job.period}</span>
                                </div>
                            </div>

                            <p className="mb-5 text-sm text-muted-foreground">{job.role}</p>

                            {roleScope && (
                                <div className="mb-5 rounded-[var(--radius-control)] border border-border/60 bg-muted/30 px-4 py-4">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                        {dictionary.experience.labels.role}
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{roleScope}</p>
                                </div>
                            )}

                            <div className="mb-5 grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                        {dictionary.experience.labels.context}
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.context}</p>
                                </div>

                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                        {dictionary.experience.labels.constraints}
                                    </p>
                                    <ul className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                                        {job.constraints.map((item, index) => (
                                            <li key={index} className="leading-relaxed">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {decisions.length > 0 && (
                                <div className="mb-5">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                        {dictionary.experience.labels.decisions}
                                    </p>

                                    <div className="mt-3 grid gap-3 lg:grid-cols-2">
                                        {decisions.map((decision) => (
                                            <div
                                                key={decision.title}
                                                className="rounded-[var(--radius-control)] border border-border/60 bg-muted/20 px-4 py-4"
                                            >
                                                <p className="text-sm font-medium text-foreground">{decision.title}</p>
                                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                    {decision.rationale}
                                                </p>
                                                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                                                    <span className="font-medium text-foreground/80">
                                                        {decision.alternative
                                                            ? dictionary.experience.labels.alternative
                                                            : ""}
                                                        {/* {dictionary.experience.labels.alternative}: */}
                                                    </span>{" "}
                                                    {decision.alternative}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                {job.achievements.map((item, i) => (
                                    <li key={i} className="leading-relaxed">
                                        {item}
                                    </li>
                                ))}
                                {validation && (
                                    <li className="mt-3 border-l-2 border-border pl-4 text-muted-foreground">
                                        <strong className="text-foreground/80">
                                            {dictionary.experience.labels.validation}:
                                        </strong>{" "}
                                        {validation}
                                    </li>
                                )}
                                {tradeoff && (
                                    <li className="mt-3 border-l-2 border-border pl-4 text-muted-foreground">
                                        <strong className="text-foreground/80">
                                            {dictionary.experience.labels.tradeoff}:
                                        </strong>{" "}
                                        {tradeoff}
                                    </li>
                                )}
                            </ul>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {job.stack.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="text-[10px]">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
