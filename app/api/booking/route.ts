import nodemailer from "nodemailer";

// Booking form → email to the krew's Gmail (+ optional Discord ping).
// Secrets live in Vercel → Project → Settings → Environment Variables (never in the code):
//   GMAIL_USER           the Gmail address that sends the booking email
//   GMAIL_APP_PASSWORD   a 16-character Google "App Password" for that account
//   BOOKING_TO           optional: where bookings go (comma-separated for several). Defaults to GMAIL_USER.
//   DISCORD_WEBHOOK_URL  optional: also post each booking to a Discord channel

export const runtime = "nodejs";

const LIMITS = { name: 80, contact: 120, type: 40, date: 60, where: 80, message: 1500 } as const;
type Field = keyof typeof LIMITS;

// Best-effort flood protection per server instance: max 5 bookings per IP per 10 minutes.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
// Discord: visitors can't trigger @everyone/@here pings or formatting tricks.
const dc = (s: string) => s.replace(/@(everyone|here)/gi, "@​$1").replace(/[`*_~|>]/g, (c) => "\\" + c);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: real people never see this field; bots fill it. Pretend success so they move on.
  if (typeof body.company === "string" && body.company.trim()) return Response.json({ ok: true, code: "TK-0000-OK" });

  const f = {} as Record<Field, string>;
  for (const key of Object.keys(LIMITS) as Field[]) {
    const v = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    f[key] = v.slice(0, LIMITS[key]);
  }
  if (!f.name || !f.contact || !f.message) {
    return Response.json({ ok: false, error: "Name, contact and details are required." }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return Response.json({ ok: false, error: "Too many requests. Try again in a few minutes." }, { status: 429 });

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if ((!user || !pass) && !webhook) {
    console.error("Booking not configured: set GMAIL_USER + GMAIL_APP_PASSWORD (and/or DISCORD_WEBHOOK_URL)");
    return Response.json({ ok: false, error: "Booking isn't set up yet." }, { status: 500 });
  }

  // Short booking code shown on the confirmation pass and in the email, e.g. TK-1019-JR4K
  const now = new Date();
  const mmdd = `${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const initials = f.name.split(/\s+/).map((w) => w[0] || "").join("").replace(/[^a-z]/gi, "").slice(0, 2).toUpperCase() || "TK";
  const code = `TK-${mmdd}-${initials}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;

  const rows: [string, string][] = [
    ["Name", f.name],
    ["Reach them at", f.contact],
    ["For", f.type || "Not specified"],
    ...(f.date ? ([["Date", f.date]] as [string, string][]) : []),
    ...(f.where ? ([["Where", f.where]] as [string, string][]) : []),
    ["Details", f.message],
  ];

  const jobs: Promise<unknown>[] = [];

  if (user && pass) {
    const html = `
  <div style="background:#0b0b0d;padding:24px;font-family:Helvetica,Arial,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;width:100%;border-radius:16px;overflow:hidden;background:#f2efe8">
      <tr>
        <td style="padding:22px 24px 8px">
          <div style="font-size:11px;letter-spacing:2px;color:#7a756c;font-weight:bold">TEKKREW · BOOKING PASS · ${esc(code)}</div>
          <div style="font-size:28px;font-weight:900;color:#111;margin-top:6px;text-transform:uppercase">New booking</div>
        </td>
        <td style="width:90px;background:#FF4328;color:#fff;text-align:center;font-weight:900;font-size:13px;letter-spacing:2px" rowspan="2">ADMIT</td>
      </tr>
      <tr><td style="padding:6px 24px 22px">
        ${rows
          .map(
            ([k, v]) => `
          <div style="border-bottom:1px solid rgba(0,0,0,.12);padding:10px 0">
            <div style="font-size:10px;letter-spacing:2px;color:#7a756c;font-weight:bold;text-transform:uppercase">${esc(k)}</div>
            <div style="font-size:15px;color:#111;margin-top:3px;white-space:pre-wrap">${esc(v)}</div>
          </div>`
          )
          .join("")}
        <div style="font-size:12px;color:#7a756c;margin-top:14px">${
          isEmail(f.contact) ? "Hit Reply to answer them directly." : "Reach them using the contact above."
        }</div>
      </td></tr>
    </table>
  </div>`;
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    jobs.push(
      transporter.sendMail({
        from: `"TekKREW Bookings" <${user}>`,
        to: process.env.BOOKING_TO || user,
        subject: `TekKREW Booking: ${f.name}${f.type ? ` · ${f.type}` : ""} (${code})`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nBooking code: ${code}\nSent from the booking ticket on tekkrew.com`,
        html,
        ...(isEmail(f.contact) ? { replyTo: `"${f.name.replace(/"/g, "")}" <${f.contact}>` } : {}),
      })
    );
  }

  if (webhook) {
    jobs.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "TekKREW Bookings",
          content: `🎟️ New booking from **${dc(f.name)}**`,
          allowed_mentions: { parse: [] },
          embeds: [
            {
              title: `Booking pass · ${code}`,
              color: 0xff4328,
              fields: rows.map(([k, v]) => ({ name: k, value: dc(v), inline: k !== "Details" })),
              footer: { text: "tekkrew.com · HTX • DTX" },
              timestamp: now.toISOString(),
            },
          ],
        }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Discord responded ${r.status}`);
      })
    );
  }

  // Succeed if at least one channel delivered.
  const results = await Promise.allSettled(jobs);
  results.forEach((r) => r.status === "rejected" && console.error("Booking channel failed", r.reason));
  if (results.some((r) => r.status === "fulfilled")) return Response.json({ ok: true, code });
  return Response.json({ ok: false, error: "Couldn't send right now." }, { status: 502 });
}
