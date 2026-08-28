"use client";

import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/shared/config/site";
import { Container } from '@/shared/components/layout/Container';

const socialLinks = [
  { href: siteConfig.social.linkedin, label: "LinkedIn" },
  { href: siteConfig.social.facebook, label: "Facebook" },
  { href: siteConfig.social.instagram, label: "Instagram" },
  { href: siteConfig.social.youtube, label: "YouTube" },
] as const;

function SocialIcon({ label }: { label: (typeof socialLinks)[number]["label"] }) {
  switch (label) {
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
  }
}

export function TopBar({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const pathname = usePathname();

  if (pathname === "/" || isCollapsed) return null;

  const phoneHref = `tel:${siteConfig.contact.phone.replace(/[\s-]/g, "")}`;

  return (
    <div
      className={`hidden w-full overflow-hidden border-b border-white/5 bg-slate-950 dark:bg-black/40 text-slate-300 transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:grid ${isCollapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}
    >
      <div className="overflow-hidden">
        <Container className="flex items-center justify-between gap-4 py-2.5 text-[13px] font-semibold tracking-wide">
          <div className="flex min-w-0 items-center gap-5 sm:gap-8">
            <span className="hidden items-center gap-1.5 text-slate-400 lg:flex">
              <MapPin size={13} className="shrink-0" aria-hidden="true" />
              {siteConfig.contact.location}
            </span>
            
            <span className="hidden h-4 w-px bg-white/10 lg:block" aria-hidden="true" />

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group flex min-w-0 items-center gap-2 transition-colors hover:text-white"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Mail size={14} className="shrink-0" aria-hidden="true" />
              </div>
              <span className="truncate">{siteConfig.contact.email}</span>
            </a>

            <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />

            <a
              href={phoneHref}
              className="group flex shrink-0 items-center gap-2 transition-colors hover:text-white"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/10 text-pink-500 transition-colors group-hover:bg-pink-500/20">
                <Phone size={14} className="shrink-0" aria-hidden="true" />
              </div>
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
            <span className="hidden text-[13px] font-bold uppercase leading-none tracking-[0.15em] text-white/40 sm:inline-flex sm:items-center">Follow us</span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden="true" />
            {socialLinks.map(({ href, label }) => {
              const brandHover =
                label === "LinkedIn"  ? "hover:text-[#0A66C2]" :
                label === "Facebook"  ? "hover:text-[#1877F2]" :
                label === "Instagram" ? "hover:text-[#E4405F]" :
                                        "hover:text-[#FF0000]";
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`inline-flex items-center justify-center text-white/45 transition-all duration-200 hover:-translate-y-0.5 ${brandHover}`}
                >
                  <SocialIcon label={label} />
                </a>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}