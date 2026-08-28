'use client';

import { useState } from 'react';
import { Download, FileText, ExternalLink } from 'lucide-react';
import PdfViewer from '@/features/academy/components/pdf/PdfViewerClient';
import PdfViewerModal from '@/features/academy/components/pdf/PdfViewerModal';

// NOTE: replace `SyllabusLevel` below with whatever your real type is
// called (probably `TrackLevel` in '@/features/academy/types/models').
type SyllabusModule = {
    title: string;
    week: number | string;
    topics: string[];
};

type SyllabusLevel = {
    syllabus: SyllabusModule[];
    syllabusPdfUrl?: string;
    courseNotesPdfUrl?: string;
};

export default function CourseResources({ currentLevel }: { currentLevel: SyllabusLevel }) {
    const [activeTab, setActiveTab] = useState<'syllabus' | 'notes'>('syllabus');
    const [activeModalUrl, setActiveModalUrl] = useState<string | null>(null);

    const hasSyllabusPdf = Boolean(currentLevel.syllabusPdfUrl);
    const hasNotesPdf = Boolean(currentLevel.courseNotesPdfUrl);

    // If neither PDF exists, we might want to hide the section entirely
    // (handled by parent typically, but good to return null just in case)
    if (!hasSyllabusPdf && !hasNotesPdf) return null;

    return (
        <section id="syllabus" className="scroll-mt-32">
            <div className="mb-8 flex flex-col gap-1">
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Course Resources</h2>
                <p className="text-helper">Everything you need to master the curriculum.</p>
            </div>

            {hasNotesPdf && (
                <div className="mb-6 flex items-center gap-2 border-b border-ink/5 pb-4">
                    <button
                        onClick={() => setActiveTab('syllabus')}
                        className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                            activeTab === 'syllabus'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-panel text-steel hover:bg-ink/5 hover:text-ink'
                        }`}
                    >
                        Syllabus
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                            activeTab === 'notes'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-panel text-steel hover:bg-ink/5 hover:text-ink'
                        }`}
                    >
                        Course Notes
                    </button>
                </div>
            )}

            {activeTab === 'syllabus' && hasSyllabusPdf && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-bold text-ink">Detailed Syllabus</h3>
                            <p className="mt-0.5 text-sm text-helper">The complete curriculum breakdown.</p>
                        </div>
                        <a
                            href={currentLevel.syllabusPdfUrl!}
                            download
                            className="flex items-center gap-1.5 text-[13px] font-bold text-primary transition-all hover:text-primary/80 active:scale-95"
                        >
                            <Download size={14} />
                            Download Syllabus
                        </a>
                    </div>
                    
                    <div 
                        className="relative overflow-hidden rounded-xl border border-ink/10 group cursor-pointer bg-white shadow-sm transition-shadow hover:shadow-md"
                        onClick={() => setActiveModalUrl(currentLevel.syllabusPdfUrl!)}
                    >
                        <div className="absolute inset-0 z-10 bg-transparent transition-all group-hover:bg-ink/10 flex items-center justify-center">
                            <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-sm text-white shadow-xl">
                                <ExternalLink size={16} />
                                Preview Full Syllabus
                            </div>
                        </div>
                        <div className="h-[600px] overflow-hidden pointer-events-none select-none opacity-80 transition-opacity group-hover:opacity-100">
                            <PdfViewer url={currentLevel.syllabusPdfUrl!} />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'notes' && hasNotesPdf && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-bold text-ink">Premium Course Notes</h3>
                            <p className="mt-0.5 text-sm text-helper">High-quality references for offline studying.</p>
                        </div>
                        <a
                            href={currentLevel.courseNotesPdfUrl!}
                            download
                            className="flex items-center gap-1.5 text-[13px] font-bold text-primary transition-all hover:text-primary/80 active:scale-95"
                        >
                            <Download size={14} />
                            Download Notes
                        </a>
                    </div>
                    
                    <div 
                        className="relative overflow-hidden rounded-xl border border-ink/10 group cursor-pointer bg-white shadow-sm transition-shadow hover:shadow-md"
                        onClick={() => setActiveModalUrl(currentLevel.courseNotesPdfUrl!)}
                    >
                        <div className="absolute inset-0 z-10 bg-transparent transition-all group-hover:bg-ink/10 flex items-center justify-center">
                            <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-sm text-white shadow-xl">
                                <ExternalLink size={16} />
                                Preview Full Notes
                            </div>
                        </div>
                        <div className="h-[600px] overflow-hidden pointer-events-none select-none opacity-80 transition-opacity group-hover:opacity-100">
                            <PdfViewer url={currentLevel.courseNotesPdfUrl!} />
                        </div>
                    </div>
                </div>
            )}

            {activeModalUrl && (
                <PdfViewerModal
                    url={activeModalUrl}
                    title={activeTab === 'syllabus' ? 'Detailed Syllabus' : 'Course Notes'}
                    onClose={() => setActiveModalUrl(null)}
                />
            )}
        </section>
    );
}