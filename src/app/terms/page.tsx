import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLegalPageBySlug } from "@/shared/services/cms";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms governing use of the ${siteConfig.name} website, academy, and agency services.`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default async function TermsPage() {
  const data = await getLegalPageBySlug("terms");
  if (!data) notFound();
  const { title, updated, sections } = data;

  return (
    <article className="mx-auto max-w-3xl px-6 py-28 lg:px-12 lg:py-32">
      <Link href="/" className="text-sm font-semibold text-primary hover:underline">
        ← Back to home
      </Link>

      <header className="mt-8 border-b border-ink/10 pb-8">
        <h1 className="page-heading mb-8 text-ink">{title}</h1>
        <p className="mt-3 text-helper">Last updated: {updated}</p>
      </header>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-xl font-bold text-ink">{section.heading}</h2>
            <p className="mt-3 text-base leading-relaxed text-steel">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

