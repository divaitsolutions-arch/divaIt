import { Mail, MapPin, ChevronDown, Megaphone } from "lucide-react";
import { FormState } from "../types";
import { DISTRICTS, HEAR_ABOUT_OPTIONS } from "../constants";
import { Field } from "../components/SharedUI";

interface Props {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}

export function PersonalInfo({ form, setForm }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Full name" required>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Enter your full name"
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-[14px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </Field>

      <Field label="Phone number" required>
        <div className="flex gap-2">
          <span className="flex shrink-0 items-center gap-1 rounded-xl border border-ink/10 bg-ink/[0.02] px-3 py-3 text-[14px] text-steel">
            🇳🇵 +977
          </span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="98XXXXXXXX"
            className="w-full min-w-0 flex-1 rounded-xl border border-ink/10 bg-white px-4 py-3 text-[14px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </Field>

      <Field label="Email address" hint="Optional">
        <div className="relative">
          <Mail
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-steel"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-ink/10 bg-white py-3 pl-10 pr-4 text-[14px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </Field>

      <Field label="Current location / district" required>
        <div className="relative">
          <MapPin
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-steel"
          />
          <select
            value={form.district}
            onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))}
            className="w-full appearance-none rounded-xl border border-ink/10 bg-white py-3 pl-10 pr-9 text-[14px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="" disabled>
              Select your district
            </option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-steel"
          />
        </div>
      </Field>

      <Field label="How did you hear about us?" hint="Optional">
        <div className="relative">
          <Megaphone
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-steel"
          />
          <select
            value={form.hearAbout}
            onChange={(e) => setForm((f) => ({ ...f, hearAbout: e.target.value }))}
            className="w-full appearance-none rounded-xl border border-ink/10 bg-white py-3 pl-10 pr-9 text-[14px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="" disabled>
              Select an option
            </option>
            {HEAR_ABOUT_OPTIONS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-steel"
          />
        </div>
      </Field>
    </div>
  );
}
