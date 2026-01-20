export const runtime = "nodejs";

type Project = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  url: string;
};

let cache: { projects: Project[] } | null = null;
let cacheTime = 0;
const CACHE_MS = 5 * 60 * 1000;

function formatDateYYYYMMDD(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function GET() {
  try {
    // ✅ 5-min server cache
    const now = Date.now();
    if (cache && now - cacheTime < CACHE_MS) {
      return Response.json(cache);
    }

    // ✅ last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const sinceStr = formatDateYYYYMMDD(since);

    const query = `topic:ai created:>=${sinceStr}`;
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query
    )}&sort=stars&order=desc&per_page=12`;

    const headers: Record<string, string> = {
      "User-Agent": "ex2-app",
      Accept: "application/vnd.github+json",
    };

    // ⭐ מומלץ מאוד: אם יש לך טוקן, זה פותר rate limit
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const ghRes = await fetch(url, {
      headers,
      cache: "no-store",
    });

    if (!ghRes.ok) {
      const txt = await ghRes.text();
      // תמיד להחזיר JSON תקין עם content-type
      return Response.json(
        { error: "GitHub API failed", status: ghRes.status, details: txt.slice(0, 500) },
        { status: 500 }
      );
    }

    const json = await ghRes.json();

    const projects: Project[] = (json.items || []).map((r: any) => ({
      id: r.id,
      name: r.full_name,
      description: r.description,
      stars: r.stargazers_count,
      url: r.html_url,
    }));

    const payload = { projects };

    cache = payload;
    cacheTime = Date.now();

    return Response.json(payload);
  } catch (e: any) {
    // ✅ גם קריסות לא צפויות חוזרות כ-JSON (ולא מפילות הכל)
    return Response.json(
      { error: "Server error", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
