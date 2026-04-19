import { Resend } from "resend";
import { appointmentSchema } from "@/lib/appointment/schema";

export const runtime = "nodejs";

type ApiOk = { ok: true };
type ApiErr = { ok: false; error: string };

function json(status: number, body: ApiOk | ApiErr) {
  return Response.json(body, { status });
}

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return json(400, { ok: false, error: "Invalid JSON body" });
  }

  const parsed = appointmentSchema.safeParse(data);
  if (!parsed.success) {
    return json(400, { ok: false, error: "Invalid form data" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPOINTMENT_TO_EMAIL;
  const from = process.env.APPOINTMENT_FROM_EMAIL || "Nafas <no-reply@nafasbeautylounge.com>";

  if (!apiKey || !to) {
    return json(500, { ok: false, error: "Email service not configured" });
  }

  const resend = new Resend(apiKey);
  const { name, phone, service, date, message } = parsed.data;

  const subject = `New appointment request — ${name}`;
  const text = [
    "New appointment request",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Preferred date/time: ${date}`,
    message ? `Message: ${message}` : "Message: —",
  ].join("\n");

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      text,
    });
    return json(200, { ok: true });
  } catch {
    return json(502, { ok: false, error: "Failed to send email" });
  }
}

