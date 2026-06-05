import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";

import Link from "next/link";

import { RestoreButton } from "@/components/restoreBtn";

export default async function TrashPage() {

  const user =
    await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const result =
    await pool.query(
      `
      SELECT
        id,
        original_url,
        short_code,
        clicks,
        created_at,
        deleted_at
      FROM urls
      WHERE user_id = $1
      AND deleted_at IS NOT NULL
      ORDER BY deleted_at DESC
      `,
      [user.userId]
    );

  const urls = result.rows;

  const links = urls.map(
    (url) => ({
      ...url,
      host:
        new URL(
          url.original_url
        ).hostname.replace(
          /^www\./,
          ""
        ),
    })
  );

  return (
    <main className="min-h-screen bg-background">

      <Header />

      <section className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Trash
            </h1>

            <p className="mt-2 text-muted-foreground">
              Recently deleted URLs.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="
              rounded-xl
              border
              border-border/50
              bg-card/30
              px-4
              py-2
              text-sm
              backdrop-blur-sm
              hover:bg-primary/5
            "
          >
            Back to Dashboard
          </Link>

        </div>

        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">

          <table className="w-full">

            <thead>

              <tr className="border-b border-border/50">

                <th className="px-6 py-4 text-left">
                  Host
                </th>

                <th className="px-6 py-4 text-left">
                  Short URL
                </th>

                <th className="px-6 py-4 text-left">
                  Deleted At
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
                  className="
                    border-b
                    border-border/30
                    hover:bg-primary/5
                  "
                >
                  <td className="px-6 py-4">
                    {link.host}
                  </td>

                  <td className="px-6 py-4 font-mono">
                    {link.short_code}
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {
                      new Date(
                        link.deleted_at
                      ).toLocaleDateString()
                    }
                  </td>

                  <td className="px-6 py-4 text-right">
                    <RestoreButton
                      urlId={link.id}
                    />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}