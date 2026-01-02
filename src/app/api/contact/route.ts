import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contactFormSchema";
import { sendContactEmail } from "@/lib/services/emailService";
import { checkRateLimit, getClientIP } from "@/lib/rateLimit";

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(clientIP, 5, 15 * 60 * 1000);

    if (rateLimit.limited) {
      const retryAfter = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.resetTime),
          },
        }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.website || body.url || body.honeypot) {
      return NextResponse.json(
        {
          success: true,
          ok: true,
          message: "Thank you for your message! We'll get back to you soon.",
        },
        { status: 200 }
      );
    }

    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payload",
          errors: validationResult.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    await sendContactEmail({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    return NextResponse.json(
      {
        success: true,
        ok: true,
        message: "Thank you for your message! We'll get back to you soon.",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetTime),
        },
      }
    );
  } catch (error) {
    // Log detailed error server-side
    console.error("Contact form error:", error);

    // Return generic error message to client (don't expose internal details)
    const isProduction = process.env.NODE_ENV === 'production'
    const errorMessage = isProduction 
      ? "An error occurred while processing your request. Please try again later."
      : (error instanceof Error ? error.message : "Server error")

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}


