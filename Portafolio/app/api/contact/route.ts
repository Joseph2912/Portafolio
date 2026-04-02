import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/contact-links";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
        }

        const resend = new Resend(apiKey);
        const body = await request.json();
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid form data", details: result.error.flatten().fieldErrors },
                { status: 400 },
            );
        }

        const { name, email, message } = result.data;

        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: CONTACT_EMAIL,
            replyTo: email,
            subject: `Portfolio: ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
