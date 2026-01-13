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
  const proto = h.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${proto}://${host}/api/trending`, {
    cache: "no-store",
  });

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
