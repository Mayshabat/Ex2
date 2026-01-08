import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = body?.text;
    const apiKey =
  body?.apiKey ||
  req.headers.get("authorization")?.replace("Bearer ", "") ||
  req.headers.get("x-api-key") ||
  "";


    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 400 });
    }
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",

        messages: [
          {
            role: "system",
            content: "Summarize the following GitHub project in up to 3 short lines.",
          },
          { role: "user", content: text },
        ],
        temperature: 0.4,
        max_tokens: 120,
      }),
    });

    const raw = await groqRes.text(); // נקרא טקסט כדי לראות בדיוק מה Groq מחזיר

    if (!groqRes.ok) {
  return NextResponse.json(
    { error: "Groq request failed", status: groqRes.status, details: raw },
    { status: groqRes.status }
  );
}


    const data = JSON.parse(raw);
    const summary = data?.choices?.[0]?.message?.content?.trim() || "";

    return NextResponse.json({ summary });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", details: String(e) },
      { status: 500 }
    );
  }
}
