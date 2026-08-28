import { siteConfig } from "@/shared/config/site";

/** Build a mailto link with optional subject and body. */
export function mailto(subject: string, body?: string): string {
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${siteConfig.contact.email}?${params.toString()}`;
}
/** Build a WhatsApp link with a pre-filled message. */
export function whatsapp(message: string): string {
  const phoneNumber = siteConfig.contact.phone.replace(/[^0-9]/g, '');
  const params = new URLSearchParams();
  params.set("text", message);
  return `https://wa.me/${phoneNumber}?${params.toString()}`;
}

export const contactLinks = {
  academyConsultation: whatsapp(
    "Hi Diva IT Solutions! 👋\n\nI am interested in joining the Academy, but I'm not sure which track is best for me. Could we schedule a quick consultation?"
  ),
  academyEnrollment: whatsapp(
    "Hi Diva IT Solutions! 🚀\n\nI am ready to enroll in the Academy! Please let me know the next steps."
  ),
  agencyProject: whatsapp(
    "Hi Diva IT Solutions! 💻\n\nI'd like to discuss a potential project for your agency. When are you available to chat?"
  ),
  newsletterSignup: (email: string) =>
    mailto("Newsletter signup", `Please add me to your updates list:\n\n${email}`),
} as const;
