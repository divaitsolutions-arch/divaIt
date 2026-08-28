// shared/components/pdf/PdfViewerClient.tsx
'use client';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('./PdfViewer'), {
    ssr: false,
    loading: () => <div className="h-[400px] animate-pulse rounded-xl bg-panel" />,
});

export default PdfViewer;