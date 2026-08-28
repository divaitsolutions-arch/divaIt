'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export default function PdfViewer({ url, maxWidth = 780 }: { url: string; maxWidth?: number }) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    return (
        <div className="flex flex-col items-center rounded-xl border border-ink/10 bg-panel/40 p-4">
            <Document
                file={url}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                    <div className="flex h-[400px] items-center justify-center text-steel">
                        <Loader2 className="animate-spin" size={24} />
                    </div>
                }
                error={
                    <div className="flex h-[200px] items-center justify-center text-sm text-steel">
                        Couldn&apos;t load the preview.{' '}
                        <a href={url} className="ml-1 underline" target="_blank" rel="noreferrer">
                            Open it directly
                        </a>
                        .
                    </div>
                }
            >
                <Page pageNumber={pageNumber} width={maxWidth} />
            </Document>

            {numPages && numPages > 1 && (
                <div className="mt-4 flex items-center gap-4">
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber((p) => p - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 disabled:opacity-30"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-[13px] font-semibold text-steel tabular-nums">
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber((p) => p + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 disabled:opacity-30"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}