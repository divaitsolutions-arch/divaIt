'use client';

import { useState } from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, MoveRight, Loader2, Mail, User, Briefcase, GraduationCap, Rocket, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';

const InquiryTypeSchema = z.enum(['learning', 'services']);

const ContactSchema = z.object({
  inquiryType: InquiryTypeSchema,
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide a bit more detail"),
  bot_field: z.string().optional(),
});

type FormData = z.infer<typeof ContactSchema>;

const INITIAL_FORM: FormData = {
  inquiryType: 'services',
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  bot_field: '',
};

export function ContactFormClient() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    
    const result = ContactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
      
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed to send");
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      setIsSubmitting(false);
      setApiError("Failed to send message. Please try again or contact us directly.");
    }
  };

  const isServices = form.inquiryType === 'services';
  const inputFocus = isServices
    ? 'focus:border-primary focus:ring-1 focus:ring-primary'
    : 'focus:border-primary focus:ring-1 focus:ring-primary';

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-ink/10 rounded-3xl bg-panel">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-8 ring-emerald-50/50">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-ink">Inquiry Received</h3>
        <p className="max-w-md text-steel">
          Thank you for reaching out. Our team will review your details and get back to you within 24 hours.
        </p>
        <Link 
          href="/"
          className="mt-8 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-ink/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-panel p-6 sm:p-10 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Honeypot Field */}
        <input
          type="text"
          name="bot_field"
          className="hidden"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          value={form.bot_field || ''}
          onChange={(e) => setForm({ ...form, bot_field: e.target.value })}
        />
        
        {/* Intent Selector */}
        <div className="flex flex-col gap-3">
          <label className="text-[13px] font-bold uppercase tracking-wider text-steel">
            What can we help you with?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setForm({ ...form, inquiryType: 'services' })}
              className={`relative overflow-hidden flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                isServices ? 'border-primary bg-primary/5' : 'border-ink/10 bg-paper hover:border-primary/30'
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isServices ? 'bg-primary text-white' : 'bg-ink/5 text-steel'}`}>
                <Rocket size={18} />
              </div>
              <div>
                <span className="block font-bold text-ink">Service Inquiry</span>
                <span className="block text-helper mt-0.5">Build a product or hire a team</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, inquiryType: 'learning' })}
              className={`relative overflow-hidden flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                !isServices ? 'border-primary bg-primary/5' : 'border-ink/10 bg-paper hover:border-primary/30'
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${!isServices ? 'bg-primary text-white' : 'bg-ink/5 text-steel'}`}>
                <GraduationCap size={20} />
              </div>
              <div>
                <span className="block font-bold text-ink">Training Inquiry</span>
                <span className="block text-helper mt-0.5">Learn to code or join a bootcamp</span>
              </div>
            </button>
          </div>
        </div>

        {/* Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            <input
              type="text"
              className={`rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none ${inputFocus} transition-colors`}
              placeholder="Jane Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="text-[13px] font-medium text-primary">{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email"
              className={`rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none ${inputFocus} transition-colors`}
              placeholder="jane@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <span className="text-[13px] font-medium text-primary">{errors.email}</span>}
          </div>
        </div>

        {/* Phone Field */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
            <Phone size={14} /> Phone Number (Optional)
          </label>
          <input
            type="tel"
            className={`rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none ${inputFocus} transition-colors`}
            placeholder="+977 980-0000000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        {/* Dynamic Field Based on Intent */}
        <AnimatePresence mode="wait">
          <motion.div
            key={form.inquiryType}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 overflow-hidden"
          >
            <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2 mt-2">
              {isServices ? <><Briefcase size={14} /> Company (Optional)</> : <><GraduationCap size={14} /> Current Status (Optional)</>}
            </label>
            <input
              type="text"
              className={`rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none ${inputFocus} transition-colors`}
              placeholder={isServices ? "Acme Corp" : "e.g. Student, Recent Grad, Professional"}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </motion.div>
        </AnimatePresence>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
            <MessageSquare size={14} /> {isServices ? "Project Details" : "What do you want to achieve?"}
          </label>
          <textarea
            rows={5}
            className={`rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none ${inputFocus} transition-colors resize-none`}
            placeholder={isServices 
              ? "Tell us about what you want to build, your goals, and timelines..." 
              : "Tell us about your learning goals or which courses you are interested in..."}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {errors.message && <span className="text-[13px] font-medium text-primary">{errors.message}</span>}
        </div>

        {apiError && (
          <div className="rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
            {apiError}
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-[15px] font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100`}
          >
            {isSubmitting ? (
              <><Loader2 size={18} className="animate-spin" /> Sending...</>
            ) : (
              <>Send Inquiry <MoveRight size={18} className="transition-transform group-hover:translate-x-1" /></>
            )}
          </button>
          <p className="mt-4 text-helper">
            By submitting this form, you agree to our <Link href="/terms" className="underline hover:text-ink">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link>.
          </p>
        </div>
      </form>
    </div>
  );
}
