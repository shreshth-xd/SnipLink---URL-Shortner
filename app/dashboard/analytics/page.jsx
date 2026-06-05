import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import Link from "next/link";

export default async function AnalyticsPage() {

  const user =
    await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [
    clicksResult,
    urlsResult,
    topUrlsResult,
    countriesResult,
    citiesResult,
    referrersResult,
  ] = await Promise.all([

    pool.query(
      `
      SELECT
        COALESCE(
          SUM(clicks),
          0
        ) AS total_clicks
      FROM urls
      WHERE user_id = $1
      AND deleted_at IS NULL
      `,
      [user.userId]
    ),

    pool.query(
      `
      SELECT
        COUNT(*) AS total_urls
      FROM urls
      WHERE user_id = $1
      AND deleted_at IS NULL
      `,
      [user.userId]
    ),

    pool.query(
      `
      SELECT
        id,
        short_code,
        original_url,
        clicks
      FROM urls
      WHERE user_id = $1
      AND deleted_at IS NULL
      ORDER BY clicks DESC
      LIMIT 5
      `,
      [user.userId]
    ),

    pool.query(
    `
        SELECT
        country,
        COUNT(*) AS clicks
        FROM click_events ce
        JOIN urls u
        ON ce.url_id = u.id
        WHERE u.user_id = $1
        AND country IS NOT NULL
        GROUP BY country
        ORDER BY clicks DESC
        LIMIT 10
    `,
    [user.userId]
    ),

    pool.query(
    `
        SELECT
        city,
        COUNT(*) AS clicks
        FROM click_events ce
        JOIN urls u
        ON ce.url_id = u.id
        WHERE u.user_id = $1
        AND city IS NOT NULL
        GROUP BY city
        ORDER BY clicks DESC
        LIMIT 10
    `,
    [user.userId]
    ),

    pool.query(
    `
        SELECT
        COALESCE(referrer, 'Direct') AS source,
        COUNT(*) AS clicks
        FROM click_events ce
        JOIN urls u
        ON ce.url_id = u.id
        WHERE u.user_id = $1
        GROUP BY source
        ORDER BY clicks DESC
        LIMIT 10
        `,
        [user.userId]
    )

  ]);

  const totalClicks =
    Number(
      clicksResult.rows[0]
      .total_clicks
    );

  const totalUrls =
    Number(
      urlsResult.rows[0]
      .total_urls
    );

  const topUrls =
    topUrlsResult.rows;

  const showTopUrls =
    totalClicks >= 10;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Analytics
            </h1>

            <p className="mt-2 text-muted-foreground">
              Insights into your shortened URLs.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="
              rounded-lg
              border
              border-border/50
              bg-card/30
              px-4
              py-2
              text-sm
              transition-all
              hover:border-primary/30
              hover:bg-primary/5
              hover:text-primary
            "
          >
            Back to Dashboard
          </Link>

        </div>

        {/* Stats */}

        <div className="mb-10 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              Total Clicks
            </p>

            <p className="mt-2 text-4xl font-bold text-primary">
              {totalClicks}
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              Total URLs
            </p>

            <p className="mt-2 text-4xl font-bold text-primary">
              {totalUrls}
            </p>
          </div>

        </div>

        {showTopUrls && (

          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">

            <div className="border-b border-border/50 px-6 py-4">
              <h2 className="font-semibold">
                Top Performing URLs
              </h2>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-border/50">

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Short URL
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Clicks
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Original URL
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {topUrls.map((url) => (

                    <tr
                      key={url.id}
                      className="border-b border-border/30 hover:bg-primary/5"
                    >

                      <td className="px-6 py-4 font-mono text-primary">
                        {url.short_code}
                      </td>

                      <td className="px-6 py-4">
                        {url.clicks}
                      </td>

                      <td
                        className="max-w-sm truncate px-6 py-4 text-muted-foreground"
                        title={url.original_url}
                      >
                        {url.original_url}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </section>
    </main>
  );
}