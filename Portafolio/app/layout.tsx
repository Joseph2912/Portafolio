import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Joseph Cuartas — Frontend Developer",
    description:
        "Frontend Developer specializing in real-time systems and multi-tenant architecture. Currently at VideFace.",
    metadataBase: new URL("https://josephcuartas.dev"),
    openGraph: {
        title: "Joseph Cuartas — Frontend Developer",
        description:
            "Frontend Developer specializing in real-time systems and multi-tenant architecture. Currently at VideFace.",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Joseph Cuartas — Frontend Developer",
        description:
            "Frontend Developer specializing in real-time systems and multi-tenant architecture. Currently at VideFace.",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={cn(inter.variable, geistMono.variable)} suppressHydrationWarning>
            <body className="font-sans antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
