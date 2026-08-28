'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/shared/config/site";
import { academyFooterContent, agencyFooterContent } from "@/shared/config/navigation";
import { contactLinks } from "@/shared/lib/contact";
import { isValidEmail } from "@/shared/lib/validation";
import { getCurrentYear } from "@/shared/lib/date";
import { MoveRight } from "lucide-react";
import { Container } from '@/shared/components/layout/Container';

// lucide-react dropped brand/social icons a while back (trademark reasons),
// so these are small inline SVGs instead of a package import.
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21.2 21.2 0 0 0 14.3 4.34c-2.24 0-3.77 1.37-3.77 3.87v2.13H8v2.96h2.53V21h2.97Z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FooterContent({ isAgency }: { isAgency: boolean }) {
  const currentYear = getCurrentYear();
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const footer = isAgency ? agencyFooterContent : academyFooterContent;
  const divisionLabel = isAgency ? "Services" : "Academy";

  function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) {
      setFormError("Enter a valid email address.");
      return;
    }

    window.location.href = contactLinks.newsletterSignup(trimmed);
  }

  return (
    <footer className="relative overflow-hidden bg-[#0c111d] pt-16 pb-6" role="contentinfo">
      {/* Gradient hairline along the top edge — a quiet nod to the brand
          gradient instead of the footer just starting abruptly. */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent"
        aria-hidden="true"
      />
      {/* Ambient glow — gives the flat black some depth instead of a hard
          fill, echoing the same treatment used in the hero sections. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-[420px] w-[420px] rounded-full bg-secondary/[0.07] hidden" />
        <div className="absolute -bottom-32 right-1/4 h-[380px] w-[380px] rounded-full bg-primary/[0.05] hidden" />
      </div>

      <Container className="relative">
        <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_2fr] lg:gap-16">
          <div className="flex max-w-sm flex-col gap-5">
            <Link href="/" className="inline-block" aria-label={`${siteConfig.name} home`}>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Diva <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">IT</span>{" "}
                {divisionLabel} Pvt. Ltd.
              </span>
            </Link>
            <p className="text-base leading-relaxed text-white/80">{footer.tagline}</p>
            <div className="flex flex-row items-center gap-2 text-sm text-white/60 tracking-wider">
              <span>PAN: <span className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">609524831</span></span>
              <span className="h-3.5 w-0.5 bg-white/40"></span>
              <span>REG: <span className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">214103/75/076</span></span>
            </div>

            <form className="mt-2" onSubmit={handleNewsletterSubmit} aria-label="Newsletter signup">
              <label htmlFor="footer-email" className="mb-3 block text-sm font-bold uppercase tracking-wider text-white/70">
                Get updates
              </label>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] p-1.5 transition-all duration-300 focus-within:border-secondary/60 focus-within:bg-white/10 focus-within:shadow-[0_0_0_4px_var(--color-secondary)]">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-white transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:shadow-secondary/50"
                  aria-label="Subscribe to updates"
                >
                  <MoveRight size={15} aria-hidden="true" />
                </button>
              </div>
              {formError && (
                <p className="mt-2 text-sm text-error" role="alert">
                  {formError}
                </p>
              )}
              <p className="mt-2 text-sm text-white/40">Opens your email app to confirm signup.</p>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-white">{column.title}</h3>
                  <div className="mt-2 h-[3px] w-5 rounded-full bg-gradient-to-r from-primary to-accent" aria-hidden="true" />
                </div>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <p className="text-sm text-white/60">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-5">
              {footer.legal.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-white/60 transition-colors duration-200 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social links — icon buttons instead of plain text, with the
              platform name kept as an aria-label since the glyph alone
              isn't self-explanatory to screen reader users. */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-secondary/25"
            >
              <LinkedinIcon width={16} height={16} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-secondary/25"
            >
              <FacebookIcon width={16} height={16} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-secondary/25"
            >
              <InstagramIcon width={16} height={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
export function FooterSection() {
  const pathname = usePathname();

  // Homepage has its own dedicated closing section instead of this shared
  // footer — intentional, not an oversight.
  if (pathname === '/') return null;

  return <FooterContent isAgency={pathname.startsWith('/agency')} />;
}
