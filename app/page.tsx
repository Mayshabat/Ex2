import NewsCard from "./components/NewsCard";

type Project = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  url: string;
};

export default async function Home() {
  // Works both locally and on Vercel
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/trending`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to load trending: ${res.status} ${text.slice(0, 200)}`
    );
  }

  // Safety: avoid trying to parse HTML as JSON
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(
      `Expected JSON but got ${contentType}. Body: ${text.slice(0, 200)}`
    );
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
