
"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("LLM_API_KEY");
    if (saved) setApiKey(saved);
  }, []);

  function save() {
    localStorage.setItem("LLM_API_KEY", apiKey.trim());
    alert("Saved!");
  }

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Settings</h1>
        <p className="subtitle">Save your LLM API key (stored only in your browser)</p>
      </header>

      <div className="card" style={{ maxWidth: 520 }}>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
          API Key
        </label>

        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Paste your key here..."
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
            outline: "none",
          }}
        />

        <button
          onClick={save}
          style={{
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Save
        </button>
      </div>
    </main>
  );
}
