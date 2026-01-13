
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://huggingface.co/api/models?sort=downloads&direction=-1&limit=10"
  );

  if (!res.ok) {
    return NextResponse.json({ error: "HF request failed" }, { status: 500 });
  }

  const data = await res.json();

  const models = data.map((m: any) => ({
    id: m.id,
    name: m.modelId,
    description: m.pipeline_tag || "Hugging Face model",
    stars: m.downloads,
    url: `https://huggingface.co/${m.modelId}`,
  }));

  return NextResponse.json({ models });
}
