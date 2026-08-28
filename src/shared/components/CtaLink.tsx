import Link from "next/link";

interface CtaLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/** Renders Next.js Link for internal routes, native <a> for mailto/tel/http. */
export function CtaLink({ href, className, children }: CtaLinkProps) {
  const isExternal =
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://");

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
