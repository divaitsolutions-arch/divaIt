"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { academyNavigation, agencyNavigation, neutralNavigation } from "@/shared/config/site";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { TopBar } from "@/shared/components/layout/TopBar";
import { Container } from "@/shared/components/layout/Container";
import { ContextSwitcher } from "./navigation/ContextSwitcher";
import { MegaMenu } from "./navigation/MegaMenu";
import { MobileMenu } from "./navigation/MobileMenu";
import { divisions } from "./navigation/constants";
import type { Division } from "./navigation/types";

function NavCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white bg-cta whitespace-nowrap shadow-md shadow-cta/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cta/30"
    >
      {label}
      <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const isAcademy = pathname.startsWith("/academy");
  const isAgency = pathname.startsWith("/agency");
  const isNeutral = !isAcademy && !isAgency;
  
  const divisionKey: Division = isAcademy ? "academy" : "agency";
  const activeDivision = divisions[divisionKey];
  
  const currentNav = isNeutral ? neutralNavigation : (isAgency ? agencyNavigation : academyNavigation);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const megaCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    return () => {
      if (megaCloseTimeout.current) clearTimeout(megaCloseTimeout.current);
    };
  }, []);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  function openMega(attachTo: string) {
    if (megaCloseTimeout.current) clearTimeout(megaCloseTimeout.current as unknown as number);
    setActiveMegaMenu(attachTo);
  }
  function closeMegaDelayed() {
    megaCloseTimeout.current = setTimeout(() => setActiveMegaMenu(null), 150);
  }

  if (pathname === "/") return null;

  return (
    <>
      <header data-brand={divisionKey} className="fixed top-0 left-0 right-0 z-50">
        {!isNeutral && <TopBar isCollapsed={isScrolled} />}
        <nav
          className={`relative border-b border-ink/10 bg-paper/90 py-2 backdrop-blur-lg transition-shadow ${isScrolled ? "shadow-sm" : ""
            }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <Container className="relative z-20 flex items-center gap-6">
            <motion.div 
              className="flex shrink-0 items-center gap-3" 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link href={isNeutral ? '/' : (isAgency ? '/agency' : '/academy')} className="flex items-center no-underline transition-transform hover:scale-105" aria-label="Diva IT Home">
                <Image src="/shared/logo.png" alt="" width={44} height={44} className="h-11 w-auto" aria-hidden="true" />
              </Link>
              <div className="hidden sm:flex flex-col items-start justify-center">
                <div className="flex items-center leading-none">
                  <Link href={isNeutral ? '/' : (isAgency ? '/agency' : '/academy')} className="mr-1 text-lg font-black tracking-tight text-ink no-underline">
                    {isNeutral ? 'Diva IT Solutions' : (isAgency ? 'Diva IT' : 'Diva Skill Development')}
                  </Link>
                  {!isNeutral && <ContextSwitcher division={divisionKey} />}
                </div>
                <span className="mt-0.5 ml-0.5 block text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-ink/60">
                  Get Digital, Go Digital.
                </span>
              </div>
            </motion.div>

            <div className="hidden items-center gap-8 lg:gap-10 lg:flex ml-auto mr-10">
              {currentNav.links.map((link, index) => {
                const hasMega = activeDivision.megaMenus.some((m) => m.attachTo === link.label);
                return hasMega ? (
                  <motion.div
                    key={link.href}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onMouseEnter={() => openMega(link.label)}
                      onMouseLeave={closeMegaDelayed}
                      onFocus={() => openMega(link.label)}
                      onBlur={closeMegaDelayed}
                      aria-haspopup="true"
                      aria-expanded={activeMegaMenu === link.label}
                      className="flex items-center gap-1.5 py-2 text-[15px] font-semibold text-steel antialiased transition-colors hover:text-ink"
                    >
                    {link.label}
                    <ChevronDown
                      size={15}
                      strokeWidth={3}
                      className={`transition-transform ${activeMegaMenu === link.label ? "rotate-180" : ""}`}
                    />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.href}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      className="py-2 text-[15px] font-semibold text-steel antialiased transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              className="hidden items-center gap-5 lg:flex"
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            >
              <NavCta href={currentNav.cta.href} label={currentNav.cta.label} />
              <ThemeToggle />
            </motion.div>

            <button
              type="button"
              className="flex flex-col gap-1.5 p-2 lg:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <span className={`block h-0.5 w-5 rounded bg-ink transition-transform ${isMobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 rounded bg-ink transition-opacity ${isMobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 rounded bg-ink transition-transform ${isMobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </Container>

          {activeDivision.megaMenus.map((menu) => (
            <MegaMenu
              key={menu.attachTo}
              menu={menu}
              isOpen={activeMegaMenu === menu.attachTo}
              division={divisionKey}
              onMouseEnter={() => openMega(menu.attachTo)}
              onMouseLeave={closeMegaDelayed}
              onRequestClose={() => setActiveMegaMenu(null)}
            />
          ))}
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={closeMobile}
        isNeutral={isNeutral}
        divisionKey={divisionKey}
        currentNav={currentNav}
      />
    </>
  );
}