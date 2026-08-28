import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: `Page Not Found | ${siteConfig.name}`,
  description: "The page you are looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-paper text-ink px-6 text-center">
      <h1 className="mb-4 text-[6rem] font-display font-black leading-none tracking-tighter text-ink/10 md:text-[10rem]">
        404
      </h1>
      <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-4xl">
        Page Not Found
      </h2>
      <p className="mb-10 max-w-md text-steel">
        The page you are looking for doesn&apos;t exist or has been moved. Check the URL or return home.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper transition-all hover:scale-105 hover:bg-primary"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Return Home
      </Link>
    </div>
  );
}
