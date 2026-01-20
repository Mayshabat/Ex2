import NewsCard from "./components/NewsCard";
import { headers } from "next/headers";

type Project = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  url: string;
};

export default async function Home() {
  const h = await headers();
  const host = h.get("host");
  if (!host) throw new Error("Missing host header");

  const protoHeader = h.get("x-forwarded-proto");
  const proto = (protoHeader?.split(",")[0] ?? "https").trim(); // חשוב!

  const url = new URL("/api/trending", `${proto}://${host}`);

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load trending: ${res.status} ${text.slice(0, 200)}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got ${contentType}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();


  const projects: Project[] = data.projects || [];

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">AI Trends</h1>

        <a className="cardLink" href="/settings">
          Settings
        </a>

        <p className="subtitle">Top GitHub projects right now</p>
      </header>

      <section className="grid">
        {projects.map((p) => (
          <NewsCard key={p.id} project={p} />
        ))}
      </section>
    </main>
  );
}
