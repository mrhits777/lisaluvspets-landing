import type { Metadata } from "next";
import raw from "@/data/campaigns.json";

export const metadata: Metadata = {
  title: "Keyword Dashboard · Lisa Luvs Pets",
  robots: { index: false, follow: false },
};

type Ad = { headlines: { text: string; pinned: boolean }[]; descriptions: string[] };
type Keyword = { text: string; match: string; words: number; volume: number | null; cpc_low: number | null; cpc_high: number | null };
type AdGroup = { name: string; status: string; final_url: string; keywords: Keyword[]; ad?: Ad; planned_ad?: Ad; copy_pending?: boolean };
type Campaign = { id: string; name: string; status: string; channel: string; bidding: string; daily_budget: number; ad_groups: AdGroup[]; negatives: { text: string; match: string }[] };
const data = raw as unknown as { generated: string; customer_id: string; keyword_planner_available: boolean; campaigns: Campaign[] };

function Match({ m }: { m: string }) {
  const c = m === "PHRASE" ? "bg-blue-100 text-blue-800" : m === "EXACT" ? "bg-purple-100 text-purple-800" : "bg-stone-200 text-stone-700";
  return <span className={`rounded px-1.5 py-0.5 text-xs font-semibold ${c}`}>{m.toLowerCase()}</span>;
}
function Tail({ words }: { words: number }) {
  const [label, c] = words >= 4 ? ["long-tail", "bg-emerald-100 text-emerald-800"] : words === 3 ? ["mid-tail", "bg-amber-100 text-amber-800"] : ["short", "bg-stone-200 text-stone-600"];
  return <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${c}`}>{label}</span>;
}
const money = (v: number | null) => (v == null ? "—" : `$${v.toFixed(2)}`);

/** A Google-search-style preview of an ad group's live ad. */
function AdPreview({ ad, url }: { ad?: Ad; url: string }) {
  if (!ad) return null;
  const hs = [...ad.headlines.filter((h) => h.pinned), ...ad.headlines.filter((h) => !h.pinned)]
    .slice(0, 3).map((h) => h.text);
  const disp = url.replace(/^https?:\/\//, "");
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-1 text-xs text-stone-500">
        <span className="font-bold text-stone-900">Ad</span><span>·</span>
        <span className="truncate text-emerald-700">{disp}</span>
      </div>
      <div className="mt-1 text-[15px] font-medium leading-snug text-blue-800">{hs.join("  |  ")}</div>
      <div className="mt-1 text-sm leading-snug text-stone-600">{ad.descriptions[0]}</div>
    </div>
  );
}

/** Pick a diverse handful of ad groups to showcase. */
function pickExamples(ags: AdGroup[]): AdGroup[] {
  const want = ["dog walker belmont", "pet sitter redwood city", "cat sitter san mateo", "dog walker near me"];
  const picked: AdGroup[] = [];
  for (const w of want) {
    const m = ags.find((a) => a.name === w && a.ad);
    if (m) picked.push(m);
  }
  for (const a of ags) {
    if (picked.length >= 4) break;
    if (a.ad && !picked.includes(a)) picked.push(a);
  }
  return picked;
}

export default function KeywordDashboard() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">Keyword Dashboard</h1>
      <p className="mt-2 text-stone-600">
        Live structure of the Lisa Luvs Pets Google Ads account — example ads, campaigns, ad groups,
        keywords, match types, and negatives.
      </p>
      <p className="mt-1 text-sm text-stone-500">
        Last updated {new Date(data.generated).toLocaleString()} · customer {data.customer_id}
      </p>

      {!data.keyword_planner_available && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <strong>Search volume &amp; bid costs are pending.</strong> They require Google Ads Keyword
          Planner (Basic API access). Once granted, the Vol / CPC columns fill in on the next update.
        </div>
      )}

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
        <strong>Long-tail note:</strong> every keyword uses <em>phrase</em> match, which already captures
        long-tail searches — phrase <code>&quot;dog walker near me&quot;</code> also triggers on
        <em> &quot;affordable dog walker near me in Belmont&quot;</em>.
      </div>

      {data.campaigns.map((c) => (
        <section key={c.id} className="mt-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-xl font-bold text-stone-900">{c.name}</h2>
            <span className="rounded bg-stone-800 px-2 py-0.5 text-xs font-semibold text-white">{c.status}</span>
            <span className="text-sm text-stone-500">
              {c.channel} · {c.bidding.replaceAll("_", " ").toLowerCase()} · ${c.daily_budget.toFixed(0)}/day
            </span>
          </div>

          {/* Example ads: queued (new personal copy) + currently live */}
          {(() => {
            const examples = pickExamples(c.ad_groups);
            const pending = examples.some((a) => a.copy_pending && a.planned_ad);
            return (
              <div className="mt-4">
                <div className="text-sm font-semibold text-stone-700">Example ads</div>
                <p className="text-xs text-stone-500">Position 1 is always the keyword; the other headlines rotate. Google shows ~3 per search.</p>
                {pending && (
                  <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50/60 p-3">
                    <div className="text-xs font-semibold text-amber-800">⏳ Queued — new personal copy, goes live at next quota reset</div>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      {examples.map((ag) => <AdPreview key={ag.name + "-p"} ad={ag.planned_ad} url={ag.final_url} />)}
                    </div>
                  </div>
                )}
                <div className="mt-3">
                  <div className="text-xs font-semibold text-stone-500">Currently live</div>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {examples.map((ag) => <AdPreview key={ag.name + "-l"} ad={ag.ad} url={ag.final_url} />)}
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="mt-5 overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                <tr>
                  <th className="px-3 py-2">Ad group / keyword</th>
                  <th className="px-3 py-2">Match</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Vol / mo</th>
                  <th className="px-3 py-2">CPC (low–high)</th>
                  <th className="px-3 py-2">Landing page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {c.ad_groups.map((ag) =>
                  ag.keywords.map((k) => (
                    <tr key={ag.name + k.text}>
                      <td className="px-3 py-2 font-medium text-stone-800">{k.text}</td>
                      <td className="px-3 py-2"><Match m={k.match} /></td>
                      <td className="px-3 py-2"><Tail words={k.words} /></td>
                      <td className="px-3 py-2 text-stone-500">{k.volume ?? "—"}</td>
                      <td className="px-3 py-2 text-stone-500">{k.cpc_low == null ? "—" : `${money(k.cpc_low)}–${money(k.cpc_high)}`}</td>
                      <td className="px-3 py-2">
                        <a href={ag.final_url} className="text-blue-600 hover:underline">{ag.final_url.replace("https://", "")}</a>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>

          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-semibold text-stone-700">{c.negatives.length} negative keywords</summary>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {c.negatives.map((n) => (
                <span key={n.text} className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-700 ring-1 ring-red-100">
                  {n.text} <span className="opacity-60">{n.match.toLowerCase()}</span>
                </span>
              ))}
            </div>
          </details>
        </section>
      ))}

      <p className="mt-10 text-xs text-stone-400">Generated from the live account, updated on each deploy. Not indexed.</p>
    </main>
  );
}
