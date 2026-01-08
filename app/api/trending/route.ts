
import { NextResponse } from "next/server";
export const revalidate = 300; // cache

export async function GET() {
  const url =
    "https://api.github.com/search/repositories?q=topic:ai&sort=stars&order=desc&per_page=10";

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "GitHub request failed" },
      { status: 500 }
    );
  }

  const data = await res.json();

  const projects = (data.items || []).map((repo: any) => ({
    id: repo.id,
    name: repo.full_name,
    description: repo.description,
    stars: repo.stargazers_count,
    url: repo.html_url,
  }));

  return NextResponse.json({ projects });
}
