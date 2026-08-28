'use client';

import { useState } from 'react';
import { z } from 'zod';
import { CheckCircle2, MoveRight, Loader2, Briefcase, Mail, User, DollarSign, Phone } from 'lucide-react';

const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  projectDescription: z.string().min(10, "Please provide a bit more detail about your project"),
  bot_field: z.string().optional(),
});

type FormData = z.infer<typeof ContactSchema>;

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  budget: '',
  projectDescription: '',
  bot_field: '',
};

const BUDGET_OPTIONS = [
  "Under NPR 50,000",
  "NPR 50,000 - 150,000",
  "NPR 150,000 - 500,000",
  "NPR 500,000+",
  "Not Sure / Open",
];

export function AgencyContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    
    // Validate
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
      // Simulate API call
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
      // Handle API errors here
      setIsSubmitting(false);
      setApiError("Failed to send message. Please try again or contact us directly.");
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-8 ring-emerald-50/50">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-ink">Request Received</h3>
        <p className="max-w-md text-steel">
          Thank you for reaching out. We will review your project details and get back to you within 1 business day to schedule a discovery call.
        </p>
        <button 
          onClick={() => window.location.href = '/agency'}
          className="mt-8 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-ink/90 transition-colors"
        >
          Return to Agency Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl mx-auto">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
            <User size={14} /> Your Name
          </label>
          <input
            type="text"
            className="rounded-xl border border-ink/10 bg-panel px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Jane Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <span className="text-[13px] font-medium text-error">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
            <Mail size={14} /> Email Address
          </label>
          <input
            type="email"
            className="rounded-xl border border-ink/10 bg-panel px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="jane@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <span className="text-[13px] font-medium text-error">{errors.email}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
            <Phone size={14} /> Phone (Optional)
          </label>
          <input
            type="tel"
            className="rounded-xl border border-ink/10 bg-panel px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="+977 980-0000000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
            <Briefcase size={14} /> Company (Optional)
          </label>
          <input
            type="text"
            className="rounded-xl border border-ink/10 bg-panel px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Acme Corp"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold uppercase tracking-wider text-steel flex items-center gap-2">
          <DollarSign size={14} /> Budget Range
        </label>
        <select
            className="rounded-xl border border-ink/10 bg-panel px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          >
            <option value="" disabled>Select a budget</option>
            {BUDGET_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.budget && <span className="text-[13px] font-medium text-error">{errors.budget}</span>}
        </div>

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold uppercase tracking-wider text-steel">
          Project Description
        </label>
        <textarea
          rows={5}
          className="rounded-xl border border-ink/10 bg-panel px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
          placeholder="Tell us about what you want to build, timelines, and main goals..."
          value={form.projectDescription}
          onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
        />
        {errors.projectDescription && <span className="text-[13px] font-medium text-error">{errors.projectDescription}</span>}
      </div>

      {apiError && (
        <div className="rounded-xl bg-error-soft px-4 py-3 text-sm font-semibold text-error">
          {apiError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-4 text-[15px] font-bold text-white shadow-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <><Loader2 size={18} className="animate-spin" /> Submitting...</>
        ) : (
          <>Submit Request <MoveRight size={18} className="transition-transform group-hover:translate-x-1" /></>
        )}
      </button>
      <p className="text-center text-helper">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
}
