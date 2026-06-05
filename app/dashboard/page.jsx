import pool from "@/lib/db";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { Header } from "../../components/header";
import Link from "next/link";
import { DeleteButton } from "@/components/deleteBtn";


export default async function Dashboard() {  
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  const [
    result,
    trashResult,
    clicksResult,
  ] = await Promise.all([

    pool.query(
      `
      SELECT
          id,
          original_url,
          short_code,
          clicks,
          created_at
      FROM urls
      WHERE user_id = $1
      AND deleted_at IS NULL
      ORDER BY created_at DESC
      `,
      [user.userId]
    ),

    pool.query(
      `
      SELECT COUNT(*) AS count
      FROM urls
      WHERE user_id = $1
      AND deleted_at IS NOT NULL
      `,
      [user.userId]
    ),

    pool.query(
      `
      SELECT COALESCE(
          SUM(clicks),
          0
      ) AS total_clicks
      FROM urls
      WHERE user_id = $1
      AND deleted_at IS NULL
      `,
      [user.userId]
    ),

  ]);


  const urls = result.rows;
  const links = urls.map((url) => ({
    ...url,
    host: new URL(url.original_url).hostname.replace(/^www\./, ""),
  }));
  
  const totalUrls = links.length;

  const trashCount =
    parseInt(
      trashResult.rows[0].count,
      10
    );

  const totalClicks =
    parseInt(
      clicksResult.rows[0].total_clicks,
      10
    );
  

  return (
    <>
      <main className="min-h-screen bg-background">
        <Header />

        <section className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          {/* <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>

            <p className="mt-2 text-muted-foreground">
              Manage and monitor your shortened links.
            </p>
          </div> */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Dashboard
              </h1>

              <p className="mt-2 text-muted-foreground">
                Manage and monitor your shortened links.
              </p>
            </div>
          </div>

          
          {/* Stats */}
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">Total URLs</p>

              <p className="mt-2 text-4xl font-bold text-primary">
                {totalUrls}
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">Total Clicks</p>

              <p className="mt-2 text-4xl font-bold text-primary">
                {totalClicks}
              </p>
            </div>
          </div>

          {/* Links Table */}
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
              <h2 className="font-semibold">
                Your Links
              </h2>

               <Link
                href="/dashboard/analytics"
                className="
                  rounded-lg
                  border
                  border-border/50
                  bg-card/30
                  px-3
                  py-1.5
                  text-sm
                  font-medium
                  text-muted-foreground
                  transition-all
                  hover:border-primary/30
                  hover:bg-primary/5
                  hover:text-primary
                "
              >
                Analytics
              </Link>

              <Link
                href="/dashboard/trash"
                className="
                  rounded-lg
                  border
                  border-border/50
                  bg-card/30
                  px-3
                  py-1.5
                  text-sm
                  font-medium
                  text-muted-foreground
                  transition-all
                  hover:border-primary/30
                  hover:bg-primary/5
                  hover:text-primary
                "
              >
                Trash ({trashCount})
              </Link>
            </div>

              

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Host
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Short URL
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Clicks
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Original URL
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {links.map((link) => (
                    <tr
                      key={link.id}
                      className="border-b border-border/30 transition-colors hover:bg-primary/5"
                    >
                      <td className="px-6 py-4">{link.host}</td>

                      <td className="px-6 py-4 font-mono text-primary">
                        <Link 
                          href={`${process.env.NEXT_PUBLIC_APP_URL}/${link.short_code}`} 
                          target="_blank" rel="noopener noreferrer"
                          className="text-primary underline underline-offset-4 hover:text-primary/80"  
                        >
                          {process.env.NEXT_PUBLIC_APP_URL}/{link.short_code}
                        </Link>
                      </td>

                      <td className="px-6 py-4">{link.clicks}</td>

                      <td
                        className="max-w-sm truncate px-6 py-4 text-muted-foreground"
                        title={link.original_url}
                      >
                        {link.original_url}
                      </td>

                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(link.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <DeleteButton urlId={link.id} />
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
