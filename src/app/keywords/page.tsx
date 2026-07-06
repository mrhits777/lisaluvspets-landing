import type { Metadata } from "next";
import data from "@/data/campaigns.json";

export const metadata: Metadata = {
  title: "Keyword Dashboard · Lisa Luvs Pets",
  robots: { index: false, follow: false },
};

function Match({ m }: { m: string }) {
  const c =
    m === "PHRASE" ? "bg-blue-100 text-blue-800"
    : m === "EXACT" ? "bg-purple-100 text-purple-800"
    : "bg-stone-200 text-stone-700";
  return <span className={`rounded px-1.5 py-0.5 text-xs font-semibold ${c}`}>{m.toLowerCase()}</span>;
}

function Tail({ words }: { words: number }) {
  const [label, c] =
    words >= 4 ? ["long-tail", "bg-emerald-100 text-emerald-800"]
    : words === 3 ? ["mid-tail", "bg-amber-100 text-amber-800"]
    : ["short", "bg-stone-200 text-stone-600"];
  return <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${c}`}>{label}</span>;
}

const money = (v: number | null) => (v == null ? "—" : `$${v.toFixed(2)}`);

export default function KeywordDashboard() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">Keyword Dashboard</h1>
      <p className="mt-2 text-stone-600">
        Live structure of the Lisa Luvs Pets Google Ads account — campaigns, ad groups, keywords,
        match types, and negatives.
      </p>
      <p className="mt-1 text-sm text-stone-500">
        Last updated {new Date(data.generated).toLocaleString()} · customer {data.customer_id}
      </p>

      {!data.keyword_planner_available && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <strong>Search volume &amp; bid costs are pending.</strong> They require Google Ads Keyword
          Planner, which needs Basic API access (the account is on Explorer access). Once that&apos;s
          granted, the Vol / CPC columns fill in automatically on the next update.
        </div>
      )}

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
        <strong>Long-tail note:</strong> every keyword uses <em>phrase</em> match, which already
        captures long-tail searches — e.g. phrase <code>&quot;dog walker near me&quot;</code> also
        triggers on <em>&quot;affordable dog walker near me in Belmont&quot;</em>. So you get long-tail
        coverage without listing every variant.
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

          <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200">
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
                      <td className="px-3 py-2 text-stone-500">
                        {k.cpc_low == null ? "—" : `${money(k.cpc_low)}–${money(k.cpc_high)}`}
                      </td>
                      <td className="px-3 py-2">
                        <a href={ag.final_url} className="text-blue-600 hover:underline">
                          {ag.final_url.replace("https://", "")}
                        </a>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>

          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-semibold text-stone-700">
              {c.negatives.length} negative keywords
            </summary>
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

      <p className="mt-10 text-xs text-stone-400">
        This page is generated from the live account and updated on each deploy. Not indexed by search engines.
      </p>
    </main>
  );
}
