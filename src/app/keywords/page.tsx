import type { Metadata } from "next";
import raw from "@/data/campaigns.json";

export const metadata: Metadata = {
  title: "Keyword Dashboard · Lisa Luvs Pets",
  robots: { index: false, follow: false },
};

type Ad = { headlines: { text: string; pinned: boolean }[]; descriptions: string[] };
type Perf = {
  impressions: number; clicks: number; cost: number; conversions: number;
  conv_value: number; ctr: number; avg_cpc: number; quality_score?: number | null;
};
type CampaignPerf = Perf & { impression_share: number; lost_to_budget: number; lost_to_rank: number };
type Keyword = { text: string; match: string; words: number; perf?: Perf | null };
type AdGroup = { name: string; status: string; final_url: string; keywords: Keyword[]; ad?: Ad; planned_ad?: Ad; copy_pending?: boolean; perf?: Perf | null };
type Campaign = { id: string; name: string; status: string; channel: string; bidding: string; daily_budget: number; ad_groups: AdGroup[]; negatives: { text: string; match: string }[]; perf?: CampaignPerf };
type SearchTerm = { term: string; impressions: number; clicks: number; cost: number; conversions: number };
const data = raw as unknown as {
  generated: string; customer_id: string; keyword_planner_available: boolean;
  perf_range: string; search_terms: SearchTerm[]; campaigns: Campaign[];
};

const money = (v: number) => `$${v.toFixed(2)}`;
const rangeLabel = data.perf_range.replaceAll("_", " ").toLowerCase();

function Match({ m }: { m: string }) {
  const c = m === "PHRASE" ? "bg-blue-100 text-blue-800" : m === "EXACT" ? "bg-purple-100 text-purple-800" : "bg-stone-200 text-stone-700";
  return <span className={`rounded px-1.5 py-0.5 text-xs font-semibold ${c}`}>{m.toLowerCase()}</span>;
}

/** Quality Score chip — Google only assigns one once a keyword has enough impressions. */
function QS({ score }: { score?: number | null }) {
  if (!score) return <span className="text-stone-300">—</span>;
  const c = score >= 7 ? "bg-emerald-100 text-emerald-800" : score >= 5 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800";
  return <span className={`rounded px-1.5 py-0.5 text-xs font-bold ${c}`}>{score}/10</span>;
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "warn" }) {
  const vc = tone === "good" ? "text-emerald-700" : tone === "warn" ? "text-amber-700" : "text-stone-900";
  return (
    <div className="rounded-xl border border-stone-200 bg-white px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</div>
      <div className={`mt-1 text-2xl font-bold tabular-nums ${vc}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-stone-500">{sub}</div>}
    </div>
  );
}

/** A Google-search-style preview of an ad group's live ad. */
function AdPreview({ ad, url }: { ad?: Ad; url: string }) {
  if (!ad) return null;
  const pinned = ad.headlines.filter((h) => h.pinned).map((h) => h.text);
  const unpinned = ad.headlines.filter((h) => !h.pinned).map((h) => h.text);
  // realistic: 1 keyword headline in slot 1 + 2 rotating offers (not all 3 pins)
  const hs = [pinned[0], unpinned[0], unpinned[1]].filter(Boolean);
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
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">Keyword Dashboard</h1>
      <p className="mt-2 text-stone-600">
        Live structure <em>and</em> live performance of the Lisa Luvs Pets Google Ads account — spend,
        clicks, conversions, quality scores, and the searches that actually triggered the ads.
      </p>
      <p className="mt-1 text-sm text-stone-500">
        Last updated {new Date(data.generated).toLocaleString()} · customer {data.customer_id} · stats
        cover the {rangeLabel}
      </p>

      {data.campaigns.map((c) => {
        const p = c.perf;
        const cpa = p && p.conversions > 0 ? p.cost / p.conversions : null;
        // Sort ad groups so the ones actually getting traffic float to the top.
        const ags = [...c.ad_groups].sort(
          (a, b) => (b.perf?.impressions ?? 0) - (a.perf?.impressions ?? 0) || a.name.localeCompare(b.name),
        );
        const live = ags.filter((a) => (a.perf?.impressions ?? 0) > 0);
        const quiet = ags.length - live.length;

        return (
          <section key={c.id} className="mt-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-xl font-bold text-stone-900">{c.name}</h2>
              <span className="rounded bg-stone-800 px-2 py-0.5 text-xs font-semibold text-white">{c.status}</span>
              <span className="text-sm text-stone-500">
                {c.channel} · {c.bidding.replaceAll("_", " ").toLowerCase()} · ${c.daily_budget.toFixed(0)}/day
              </span>
            </div>

            {p && (
              <>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  <Stat label="Impressions" value={p.impressions.toLocaleString()} />
                  <Stat label="Clicks" value={p.clicks.toLocaleString()} sub={`${p.ctr.toFixed(1)}% CTR`} />
                  <Stat label="Spend" value={money(p.cost)} sub={`${money(p.avg_cpc)} avg CPC`} />
                  <Stat label="Leads" value={p.conversions.toFixed(0)} sub={`${money(p.conv_value)} value`} tone={p.conversions > 0 ? "good" : undefined} />
                  <Stat label="Cost / lead" value={cpa ? money(cpa) : "—"} tone={cpa && cpa < 40 ? "good" : undefined} />
                  <Stat label="Impr. share" value={`${p.impression_share.toFixed(0)}%`} tone={p.impression_share < 50 ? "warn" : undefined} />
                </div>

                {p.lost_to_rank > 25 && (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                    <strong>Bid-limited, not budget-limited.</strong> {p.lost_to_rank.toFixed(0)}% of available
                    impressions are lost to <em>Ad Rank</em> (bids too low to win the auction), while only{" "}
                    {p.lost_to_budget.toFixed(0)}% are lost to budget — the campaign is spending{" "}
                    {money(p.cost / 7)}/day of its ${c.daily_budget.toFixed(0)}/day. Raising the budget would
                    change nothing; the lever is the max-CPC ceiling.
                  </div>
                )}
              </>
            )}

            {/* Example ads: queued (new copy, if any) + currently live */}
            {(() => {
              const examples = pickExamples(c.ad_groups);
              const pending = examples.some((a) => a.copy_pending && a.planned_ad);
              return (
                <div className="mt-5">
                  <div className="text-sm font-semibold text-stone-700">Example ads</div>
                  <p className="text-xs text-stone-500">Position 1 is always the keyword; the other headlines rotate. Google shows ~3 per search.</p>
                  {pending && (
                    <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50/60 p-3">
                      <div className="text-xs font-semibold text-amber-800">⏳ Queued — new copy, goes live at next quota reset</div>
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

            <div className="mt-6 text-sm font-semibold text-stone-700">
              Keywords <span className="font-normal text-stone-500">— {live.length} with traffic, sorted by impressions</span>
            </div>
            <div className="mt-2 overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                  <tr>
                    <th className="px-3 py-2">Keyword</th>
                    <th className="px-3 py-2">Match</th>
                    <th className="px-3 py-2 text-right">Impr</th>
                    <th className="px-3 py-2 text-right">Clicks</th>
                    <th className="px-3 py-2 text-right">CTR</th>
                    <th className="px-3 py-2 text-right">Cost</th>
                    <th className="px-3 py-2 text-right">Leads</th>
                    <th className="px-3 py-2">QS</th>
                    <th className="px-3 py-2">Landing page</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {live.map((ag) =>
                    ag.keywords.map((k) => {
                      const kp = k.perf;
                      return (
                        <tr key={ag.name + k.text} className={kp?.conversions ? "bg-emerald-50/50" : undefined}>
                          <td className="px-3 py-2 font-medium text-stone-800">{k.text}</td>
                          <td className="px-3 py-2"><Match m={k.match} /></td>
                          <td className="px-3 py-2 text-right tabular-nums text-stone-700">{kp?.impressions ?? 0}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-stone-700">{kp?.clicks ?? 0}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-stone-500">{kp?.clicks ? `${kp.ctr.toFixed(1)}%` : "—"}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-stone-700">{kp?.cost ? money(kp.cost) : "—"}</td>
                          <td className="px-3 py-2 text-right tabular-nums font-semibold text-emerald-700">{kp?.conversions ? kp.conversions.toFixed(0) : "—"}</td>
                          <td className="px-3 py-2"><QS score={kp?.quality_score} /></td>
                          <td className="px-3 py-2">
                            <a href={ag.final_url} className="text-blue-600 hover:underline">{ag.final_url.replace("https://", "")}</a>
                          </td>
                        </tr>
                      );
                    }),
                  )}
                </tbody>
              </table>
            </div>
            {quiet > 0 && (
              <p className="mt-2 text-xs text-stone-500">
                + {quiet} more keywords with no impressions yet (mostly the low-population cities —
                Woodside, Atherton, Hillsborough, Half Moon Bay).
              </p>
            )}

            {data.search_terms.length > 0 && (
              <details className="mt-4" open>
                <summary className="cursor-pointer text-sm font-semibold text-stone-700">
                  {data.search_terms.length} actual searches that triggered these ads
                </summary>
                <p className="mt-1 text-xs text-stone-500">
                  The raw material for negative keywords — anything irrelevant here is money to claw back.
                </p>
                <div className="mt-2 overflow-x-auto rounded-xl border border-stone-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                      <tr>
                        <th className="px-3 py-2">Search term</th>
                        <th className="px-3 py-2 text-right">Impr</th>
                        <th className="px-3 py-2 text-right">Clicks</th>
                        <th className="px-3 py-2 text-right">Cost</th>
                        <th className="px-3 py-2 text-right">Leads</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {data.search_terms.map((t) => (
                        <tr key={t.term} className={t.conversions ? "bg-emerald-50/50" : undefined}>
                          <td className="px-3 py-2 text-stone-800">{t.term}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-stone-700">{t.impressions}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-stone-700">{t.clicks}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-stone-700">{t.cost ? money(t.cost) : "—"}</td>
                          <td className="px-3 py-2 text-right tabular-nums font-semibold text-emerald-700">{t.conversions ? t.conversions.toFixed(0) : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )}

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
        );
      })}

      <p className="mt-10 text-xs text-stone-400">
        Generated from the live account, updated on each deploy. Not indexed. Search-volume and bid
        estimates still require Keyword Planner (Basic API access) — the numbers above are real
        observed performance, which is better.
      </p>
    </main>
  );
}
