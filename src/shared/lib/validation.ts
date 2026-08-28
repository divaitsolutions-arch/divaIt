/**
 * Minimal client-side email shape check — not a substitute for real
 * verification (confirmation link, server-side check, etc.), just enough
 * to catch obviously malformed input before a form submits.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
    return EMAIL_PATTERN.test(value.trim());
}