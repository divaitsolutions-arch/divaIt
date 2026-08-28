// shared/components/pdf/PdfViewerModal.tsx
'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import PdfViewer from './PdfViewerClient';

export default function PdfViewerModal({
    url,
    title,
    onClose,
}: {
    url: string;
    title: string;
    onClose: () => void;
}) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-paper shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-ink/10 p-4">
                    <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
                    <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-ink/5">
                        <X size={18} />
                    </button>
                </div>
                <div className="overflow-y-auto p-4">
                    <PdfViewer url={url} maxWidth={640} />
                </div>
            </div>
        </div>
    );
}