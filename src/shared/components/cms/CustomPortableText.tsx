import { PortableText, type PortableTextProps, type PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface SanityImageValue {
  asset?: { _ref?: string };
  alt?: string;
  [key: string]: unknown;
}

interface SanityCodeValue {
  code: string;
  language?: string;
  filename?: string;
  [key: string]: unknown;
}

const customComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a href={value.href} rel={rel} target={target} className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImageValue }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden bg-ink/5 shadow-md">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog Post Image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      );
    },
    code: ({ value }: { value: SanityCodeValue }) => {
      return (
        <div className="my-8 overflow-hidden rounded-xl bg-[#1E1E1E] shadow-xl">
          <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            {value.filename && (
              <span className="ml-4 text-[13px] font-mono text-white/50">{value.filename}</span>
            )}
            {value.language && !value.filename && (
              <span className="ml-4 text-[13px] font-mono text-white/50">{value.language}</span>
            )}
          </div>
          <div className="p-4 overflow-x-auto text-sm leading-relaxed text-[#D4D4D4] font-mono">
            <pre><code>{value.code}</code></pre>
          </div>
        </div>
      );
    }
  },
};

export function CustomPortableText(props: PortableTextProps) {
  return <PortableText components={customComponents} {...props} />;
}
