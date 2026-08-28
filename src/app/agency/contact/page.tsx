import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { AgencyContactForm } from "@/features/agency/contact/components/AgencyContactForm";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: `Get a Quote | ${siteConfig.name} Agency`,
  description: "Tell us about your project. We respond within one business day.",
  alternates: {
    canonical: `${siteConfig.url}/agency/contact`,
  },
};

export default function AgencyContactPage() {
  return (
    <main className="min-h-[100dvh] bg-paper text-ink pb-20">
 <section className="relative w-full overflow-hidden border-b border-ink/5 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full hidden bg-primary/10" />
          <div className="absolute inset-0 mesh-grid opacity-30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12 text-center">
          <Link
            href="/agency"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Agency
          </Link>

          <div className="mb-6 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MessageSquare size={24} />
          </div>

          <h1 className="mb-4 page-heading">
            Let&apos;s build something <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              great together.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-steel md:text-lg">
            Share your brief below. We typically respond within one business day with next steps, questions, and a ballpark estimate.
          </p>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-8 w-full max-w-[800px] px-4 sm:px-6">
 <div className="rounded-3xl border border-ink/5 p-6 shadow-xl shadow-ink/5 sm:p-10 lg:p-12">
          <AgencyContactForm />
        </div>
      </section>
    </main>
  );
}
