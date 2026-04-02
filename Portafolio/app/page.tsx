import { Nav } from "@/components/ui/nav";
import AnimatedSection from "@/components/AnimatedSection";
import { CopyEmail } from "@/components/ui/copy-email";
import { ProfileRail } from "@/components/ui/profile-rail";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Principles from "@/components/sections/Principles";
import Contact from "@/components/sections/Contact";

export default function Page() {
    return (
        <main className="relative overflow-x-clip bg-background">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="workbench-grid absolute inset-0" />
                <div className="workbench-grid-major absolute inset-0" />
            </div>
            <Nav />
            <div className="relative z-10 mx-auto max-w-[1560px] px-4 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-24 lg:px-10">
                <div className="xl:grid xl:grid-cols-[minmax(0,920px)_352px] xl:gap-14 2xl:grid-cols-[minmax(0,980px)_372px] 2xl:gap-16">
                    <div className="min-w-0 space-y-12 sm:space-y-16">
                        <AnimatedSection>
                            <Hero />
                        </AnimatedSection>
                        <AnimatedSection delay={0.02}>
                            <Experience />
                        </AnimatedSection>
                        <Projects />
                        <AnimatedSection delay={0.03}>
                            <Principles />
                        </AnimatedSection>
                        <AnimatedSection delay={0.04}>
                            <Stack />
                        </AnimatedSection>
                        <AnimatedSection delay={0.05}>
                            <Contact />
                        </AnimatedSection>
                        <AnimatedSection delay={0.06}>
                            <footer className="border-t border-border/70 px-2 pt-8">
                                <CopyEmail />
                            </footer>
                        </AnimatedSection>
                    </div>

                    <ProfileRail />
                </div>
            </div>
        </main>
    );
}
