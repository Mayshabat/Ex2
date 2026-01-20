import NewsCard from "./components/NewsCard";

type Project = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  url: string;
};

export default async function Home() {
  const res = await fetch("/api/trending", {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load trending: ${res.status} ${text}`);
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
