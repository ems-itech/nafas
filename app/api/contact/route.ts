import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Send Email (STATIC ONLY)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New contact request from ${name}`,
      text: `
📩 New Contact Form Submission

Name: ${name}

👉 View full details in Google Sheets:
https://docs.google.com/spreadsheets/d/1shuETFItMAV-g4kB-WIWw7IYTlsyt1lMRxzJD0zz4-A/edit?gid=2104624603
      `,
    });

    // 2️⃣ Send to Google Form
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScqud0ahLZPUR1RSx2EvGhC6RiSOoalTJG7n2KRE6fcmbV13Q/formResponse";

    const formData = new URLSearchParams({
      "entry.1040491386": name,
      "entry.214294131": email,
      "entry.1834505856": message,
    });

    await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json(
      { success: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}