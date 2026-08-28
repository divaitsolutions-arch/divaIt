import { FaReact, FaWordpress, FaPython, FaAws, FaMeta, FaTiktok, FaFacebook, FaYoutube } from 'react-icons/fa6';
import { SiNextdotjs, SiDjango, SiGoogleads, SiTensorflow, SiCanvas } from 'react-icons/si';

interface BrandIconProps {
    size: number;
    className?: string;
    color?: string;
}

// These are hand-written SVGs (react-icons has no OpenAI/Anthropic glyph,
// and Google/Instagram's real marks are multicolor gradients a single
// tinted react-icons glyph can't represent), so — unlike the library icons
// below — they need aria-hidden set explicitly; nothing upstream adds it
// for us. They're purely decorative brand marks, never the sole carrier of
// information, so hiding them from the accessibility tree is correct
// regardless of where render() ends up being called from.
const OpenAIIcon = ({ size, className, color }: BrandIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color || "#10A37F"}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
    >
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2057 5.9847 5.9847 0 0 0 3.9929-2.9001 6.051 6.051 0 0 0-.7427-7.0731zM13.26 22.4302a4.4756 4.4756 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zM3.8 18.6273a4.4708 4.4708 0 0 1-.8883-2.9128l.1419.0804 4.7783 2.7582a.7948.7948 0 0 0 .7854 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.7 20.3155a4.4992 4.4992 0 0 1-5.9-1.6882zm-1.4687-9.5298a4.4944 4.4944 0 0 1 2.025-2.025l.0804.1419 2.7582 4.7783a.7948.7948 0 0 0 0 .7854l-3.3685 5.8428H1.494a.0804.0804 0 0 1-.0615-.0332l-2.7373-4.7416a4.4992 4.4992 0 0 1 .636-5.7486zm11.3626-6.666a4.4756 4.4756 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V2.4318a4.504 4.504 0 0 1 4.4945-4.4944zm6.666 4.7416a4.4708 4.4708 0 0 1 .8883 2.9128l-.1419-.0804-4.7783-2.7582a.7948.7948 0 0 0-.7854 0L9.3008 10.596V8.2636a.0804.0804 0 0 1 .0332-.0615l4.7274-2.7373a4.4992 4.4992 0 0 1 5.9 1.6882zm1.4687 9.5298a4.4944 4.4944 0 0 1-2.025 2.025l-.0804-.1419-2.7582-4.7783a.7948.7948 0 0 0 0-.7854l3.3685-5.8428h2.3324a.0804.0804 0 0 1 .0615.0332l2.7373 4.7416a4.4992 4.4992 0 0 1-.636 5.7486zM8.134 14.2274l-2.02 1.1686V9.4526a.071.071 0 0 1 .038-.052l4.7416-2.7373a.0804.0804 0 0 1 .0615.0332l2.02 1.1686-5.8428 3.3685a2.3845 2.3845 0 0 0-1.1783 2.0526v5.5826zm3.866-5.0682 2.02-1.1686v5.9434a.071.071 0 0 1-.038.052l-4.7416 2.7373a.0804.0804 0 0 1-.0615-.0332l-2.02-1.1686 5.8428-3.3685a2.3845 2.3845 0 0 0 1.1783-2.0526V9.1592z" />
    </svg>
);

const AnthropicIcon = ({ size, className, color }: BrandIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color || "#D18C61"}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
    >
        <path d="M17.387 4h3.693l-6.88 16h-3.414zm-4.707 0H9.206L.92 19.986h3.427l1.787-4.145h6.639l1.774 4.145h3.426L12.68 4zm-2.026 9.426-1.747-4.185-1.76 4.185z" />
    </svg>
);

// Google's real "G" is 4 distinct colors — a single tinted glyph can't show that.
const GoogleLogo = ({ size, className }: Pick<BrandIconProps, 'size' | 'className'>) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
    >
        <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.84h3.86c2.26-2.08 3.56-5.14 3.56-8.66z"
        />
        <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.84c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
        />
        <path
            fill="#FBBC05"
            d="M5.27 14.45c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.8H1.29A11.96 11.96 0 000 12c0 1.93.46 3.76 1.29 5.2l3.98-3.09z"
        />
        <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.8l3.98 3.17c.95-2.85 3.6-4.96 6.73-5.22z"
        />
    </svg>
);

// Instagram's real mark is a gradient stroke, not a flat pink glyph.
const InstagramLogo = ({ size, className }: Pick<BrandIconProps, 'size' | 'className'>) => {
    const gradId = 'ig-brand-icon-gradient';
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FEDA75" />
                    <stop offset="25%" stopColor="#FA7E1E" />
                    <stop offset="50%" stopColor="#D62976" />
                    <stop offset="75%" stopColor="#962FBF" />
                    <stop offset="100%" stopColor="#4F5BD5" />
                </linearGradient>
            </defs>
            <rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="none" stroke={`url(#${gradId})`} strokeWidth="2" />
            <circle cx="12" cy="12" r="5" fill="none" stroke={`url(#${gradId})`} strokeWidth="2" />
            <circle cx="17.6" cy="6.4" r="1.15" fill={`url(#${gradId})`} />
        </svg>
    );
};

export const ICON_REGISTRY = {
    react: { name: 'React', render: (s: number) => <FaReact size={s} color="#61DAFB" />, accent: '#61DAFB' },
    nextjs: { name: 'Next.js', render: (s: number) => <SiNextdotjs size={s} className="text-ink dark:text-white" />, accent: '#000000' },
    django: { name: 'Django', render: (s: number) => <SiDjango size={s} color="#092E20" />, accent: '#092E20' },
    wordpress: { name: 'WordPress', render: (s: number) => <FaWordpress size={s} color="#21759B" />, accent: '#21759B' },
    python: { name: 'Python', render: (s: number) => <FaPython size={s} color="#3776AB" />, accent: '#3776AB' },
    aws: { name: 'AWS', render: (s: number) => <FaAws size={s} color="#FF9900" />, accent: '#FF9900' },
    meta: { name: 'Meta', render: (s: number) => <FaMeta size={s} color="#0668E1" />, accent: '#0668E1' },
    tiktok: { name: 'TikTok', render: (s: number) => <FaTiktok size={s} className="text-ink dark:text-white" />, accent: '#25F4EE' },
    facebook: { name: 'Facebook', render: (s: number) => <FaFacebook size={s} color="#1877F2" />, accent: '#1877F2' },
    youtube: { name: 'YouTube', render: (s: number) => <FaYoutube size={s} color="#FF0000" />, accent: '#FF0000' },
    googleads: { name: 'Google Ads', render: (s: number) => <SiGoogleads size={s} color="#4285F4" />, accent: '#4285F4' },
    google: { name: 'Google', render: (s: number) => <GoogleLogo size={s} />, accent: '#4285F4' },
    instagram: { name: 'Instagram', render: (s: number) => <InstagramLogo size={s} />, accent: '#E1306C' },
    openai: { name: 'OpenAI', render: (s: number) => <OpenAIIcon size={s} />, accent: '#10A37F' },
    anthropic: { name: 'Anthropic', render: (s: number) => <AnthropicIcon size={s} />, accent: '#D18C61' },
    tensorflow: { name: 'TensorFlow', render: (s: number) => <SiTensorflow size={s} color="#FF6F00" />, accent: '#FF6F00' },
    canva: { name: 'Canva', render: (s: number) => <SiCanvas size={s} color="#00C4CC" />, accent: '#00C4CC' },
} as const;

export type IconRegistryId = keyof typeof ICON_REGISTRY;

/** Convenience component for using a brand icon anywhere in the app. */
export function BrandIcon({ id, size, className }: { id: IconRegistryId; size: number; className?: string }) {
    const entry = ICON_REGISTRY[id];
    if (!entry) return null;
    return <span className={className} aria-hidden="true">{entry.render(size)}</span>;
}