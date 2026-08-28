import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Tag, QrCode } from "lucide-react";
import { EnrollmentIntent, FormState, ProgramOption } from "../types";
import { PAYMENT_METHODS, ESEWA_QR_IMAGE_SRC } from "../constants";
import { formatPrice } from "../utils";
import { SummaryRow } from "../components/SharedUI";
import { resolveIcon } from "@/features/academy/lib/icons";

interface Props {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  selectedProgram?: ProgramOption;
  intent: EnrollmentIntent;
}

export function ReviewSubmit({ form, setForm, selectedProgram, intent }: Props) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrImageFailed, setQrImageFailed] = useState(false);

  useEffect(() => {
    if (form.paymentMethod === "esewa") {
      const id = setTimeout(() => {
        qrRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
      return () => clearTimeout(id);
    }
  }, [form.paymentMethod]);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[13px] font-medium text-steel">
        Review your details before submitting your application.
      </p>
      <dl className="flex flex-col divide-y divide-ink/5 rounded-xl border border-ink/10 px-4">
        <SummaryRow label="Program" value={form.program || "—"} />
        <SummaryRow
          label="Class mode"
          value={
            form.mode === "physical"
              ? "Physical (in-person)"
              : form.mode === "online"
              ? "Online"
              : "—"
          }
        />
        <SummaryRow label="Full name" value={form.name || "—"} />
        <SummaryRow
          label="Phone number"
          value={form.phone ? `+977 ${form.phone}` : "—"}
        />
        <SummaryRow label="Email address" value={form.email || "Not provided"} />
        <SummaryRow label="District" value={form.district || "—"} />
        <SummaryRow label="Heard via" value={form.hearAbout || "Not provided"} />
        {selectedProgram && intent === "enrollment" && (
          <SummaryRow
            label="Price"
            value={formatPrice(selectedProgram.price)}
            highlight
          />
        )}
      </dl>

      {selectedProgram && intent === "enrollment" && (
        <div>
          <label className="mb-2.5 flex items-center gap-1.5 text-[13px] font-medium text-ink">
            <Tag size={13} className="text-primary" />
            Payment method <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {PAYMENT_METHODS.map((method) => {
              const Icon = resolveIcon(method.icon);
              const active = form.paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      paymentMethod: method.id,
                    }))
                  }
                  className={`relative rounded-xl border p-3.5 text-left transition-all ${
                    active
                      ? "border-primary bg-primary/[0.04] shadow-[0_0_0_1px_rgba(160,59,184,0.35)]"
                      : "border-ink/10 hover:border-ink/20"
                  }`}
                >
                  <span
                    className={`absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full border ${
                      active
                        ? "border-primary bg-primary"
                        : "border-ink/20"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <Icon
                    size={16}
                    className={active ? "text-primary" : "text-steel"}
                  />
                  <p className="mt-2 text-[13.5px] font-semibold text-ink">
                    {method.label}
                  </p>
                  <p className="text-[11.5px] font-medium text-steel">
                    {method.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {form.paymentMethod === "esewa" && (
            <div
              ref={qrRef}
              className="mt-3 flex flex-col items-center gap-3 rounded-xl border border-ink/10 bg-paper p-5 text-center"
            >
              <div className="flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink/10 bg-white">
                {ESEWA_QR_IMAGE_SRC && !qrImageFailed ? (
                  <Image
                    src={ESEWA_QR_IMAGE_SRC}
                    alt="eSewa payment QR code"
                    width={176}
                    height={176}
                    className="h-full w-full object-contain p-0.5"
                    onError={() => setQrImageFailed(true)}
                  />
                ) : (
                  <QrCode size={72} strokeWidth={1} className="text-ink/25" />
                )}
              </div>
              <div className="max-w-[260px]">
                <p className="text-[13px] font-semibold text-ink">
                  Scan to pay with eSewa
                </p>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-steel">
                  Open your eSewa app and scan this code to complete payment of{" "}
                  {selectedProgram?.price !== undefined
                    ? formatPrice(selectedProgram.price)
                    : "the amount"}
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {selectedProgram && intent === "waitlist" && (
        <p className="rounded-xl border border-primary/15 bg-primary/[0.04] px-4 py-3 text-[12.5px] font-medium leading-relaxed text-steel">
          This track is not open for enrollment yet. Submit your details and our team will contact you when the next cohort is ready.
        </p>
      )}
    </div>
  );
}
