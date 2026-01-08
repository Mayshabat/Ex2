"use client";

import { useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  url: string;
};

export default function NewsCard({ project }: { project: Project }) {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function summarize() {
    setError("");
    const apiKey = localStorage.getItem("LLM_API_KEY");

    if (!apiKey) {
      setError("No API key found. Go to Settings and paste your key.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          text: `${project.name}\n\n${project.description ?? ""}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Summarize failed");
      } else {
        setSummary(data.summary);
      }
    } catch (e: any) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="card">
      <div className="cardTop">
        <h3 className="cardTitle">{project.name}</h3>
        <span className="stars">⭐ {project.stars.toLocaleString()}</span>
      </div>

      <p className="cardDesc">{project.description ?? "No description provided."}</p>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
        <button
          onClick={summarize}
          disabled={loading}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        <a className="cardLink" href={project.url} target="_blank" rel="noreferrer">
          Open →
        </a>
      </div>

      {error && (
        <p style={{ marginTop: 10, color: "#b00020", fontSize: 13 }}>{error}</p>
      )}

      {summary && (
        <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.45 }}>
          <strong>Summary:</strong> {summary}
        </p>
      )}
    </article>
  );
}
