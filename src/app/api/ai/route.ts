import { NextRequest, NextResponse } from "next/server";
import { aiModes } from "@/data/mocks/ai";

export async function POST(req: NextRequest) {
  try {
    const { mode, prompt } = await req.json();
    if (!mode || !prompt?.trim()) {
      return NextResponse.json({ error: "mode and prompt required" }, { status: 400 });
    }

    const modeConfig = aiModes.find((m) => m.id === mode);
    if (!modeConfig) {
      return NextResponse.json({ error: "invalid mode" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Dev fallback — return a mock response
      return NextResponse.json({
        content: `[وضع التطوير — مفتاح ANTHROPIC_API_KEY غير مضبوط]\n\nسيظهر هنا الـ ${modeConfig.label} المولَّد بالذكاء الاصطناعي بناءً على:\n\n"${prompt}"\n\nأضف ANTHROPIC_API_KEY إلى ملف .env لتفعيل التوليد الحقيقي.`,
      });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 2000,
        system: modeConfig.systemPrompt,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    const content = data.content?.[0]?.text ?? "";
    return NextResponse.json({ content });
  } catch (e) {
    console.error("AI route error:", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
