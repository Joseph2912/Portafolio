import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/contact-links";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

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

        const { error: resendError } = await resend.emails.send({
            from: fromEmail,
            to: CONTACT_EMAIL,
            replyTo: email,
            subject: `Portfolio: ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
        });

        if (resendError) {
            console.error("Resend error:", resendError);
            return NextResponse.json({ error: resendError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact route error:", err);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
