"use client";

import { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";

type Project = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  url: string;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/trending", { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `Failed to load trending: ${res.status} ${text.slice(0, 200)}`
          );
        }

        const data = await res.json();
        setProjects(data.projects || []);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load projects");
      }
    };

    load();
  }, []);

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">AI Trends</h1>

        <a className="cardLink" href="/settings">
          Settings
        </a>

        <p className="subtitle">Top GitHub projects right now</p>
      </header>

      {error ? (
        <p className="subtitle">{error}</p>
      ) : (
        <section className="grid">
          {projects.map((p) => (
            <NewsCard key={p.id} project={p} />
          ))}
        </section>
      )}
    </main>
  );
}
