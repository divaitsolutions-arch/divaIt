import { useEffect, useRef } from "react";
import {
  CheckCircle2,
  Armchair,
  Headphones,
  Clock,
  Star,
  Lock,
  MoveRight,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";
import { SidebarFeature } from "./components/SharedUI";
import { ProgramSelection } from "./steps/ProgramSelection";
import { PersonalInfo } from "./steps/PersonalInfo";
import { ReviewSubmit } from "./steps/ReviewSubmit";
import { useEnrollmentForm } from "./hooks/useEnrollmentForm";
import { STEPS } from "./constants";
import { formatPrice } from "./utils";

export function EnrollmentWizard() {
  const {
    form,
    setForm,
    step,
    submitted,
    isSubmitting,
    stepError,
    goNext,
    goBack,
    handleSubmit,
    selectedProgram,
    intent,
  } = useEnrollmentForm();

  // Moves focus to the current step's heading whenever the step changes
  // (via Continue/Back), so a keyboard or screen-reader user gets a clear
  // signal that the panel's content changed instead of silently tabbing
  // through new fields under an unmoved focus ring. Skipped on first
  // render so it doesn't fight the close-button autofocus set by the
  // parent EnrollmentModal when the dialog first opens.
  const stepHeadingRef = useRef<HTMLParagraphElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  return (
    <div
      className="flex w-full overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_70px_-15px_rgba(20,10,30,0.35)] ring-1 ring-black/5"
      role="dialog"
      aria-modal="true"
      aria-label="Enrollment application"
    >
      {/* ------------------------------------------------------------- */}
      {/* Left marketing sidebar                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="relative hidden w-[280px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F6EEFD] to-[#F3E4F6] p-8 md:flex">
        <div className="relative">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary/70">
            Admissions
          </span>

          <h2 className="mt-4 text-[26px] font-semibold leading-[1.2] tracking-tight text-ink">
            Reserve your seat, start with experts
          </h2>

          <p className="mt-3 text-[13px] font-medium leading-relaxed text-steel">
            Live, project-based learning with practical guidance from our team.
          </p>

          <div className="mt-9 flex flex-col gap-5">
            <SidebarFeature
              icon={Armchair}
              title="Limited seats"
              subtitle="Small batches, personal attention"
            />
            <SidebarFeature
              icon={Headphones}
              title="Free consultation"
              subtitle="1-on-1 guidance with experts"
            />
            <SidebarFeature
              icon={Clock}
              title="Quick response"
              subtitle="We contact you within 24 hrs"
            />
          </div>
        </div>

        <div className="relative">
          <div className="h-px w-full bg-ink/8" />
          <p className="mt-5 text-[13px] font-medium text-ink">
            Application support
          </p>
          <p className="mt-0.5 flex items-center gap-1 whitespace-nowrap text-[13px] font-medium text-steel">
            <Star size={11} className="shrink-0 fill-primary text-primary" />
            Clear next steps before payment
          </p>

          <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-steel">
            <Lock size={12} />
            Your information is never shared.
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Right form panel                                              */}
      {/* ------------------------------------------------------------- */}
      <div className="flex max-h-[85vh] flex-1 flex-col">
        {!submitted && (
          <div className="px-6 pb-5 pt-7 sm:px-8">
            <div className="flex items-baseline justify-between">
              <p
                ref={stepHeadingRef}
                tabIndex={-1}
                className="text-[15px] font-semibold text-ink outline-none"
              >
                {STEPS[step - 1].label}
              </p>
              <p className="text-[13px] font-medium text-steel">
                Step {step} of {STEPS.length}
              </p>
            </div>
            <div
              className="mt-3 flex gap-1.5"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={STEPS.length}
              aria-label={`Step ${step} of ${STEPS.length}: ${STEPS[step - 1].label}`}
            >
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${s.id <= step ? "bg-primary" : "bg-ink/8"
                    }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
          {submitted ? (
            <div
              className="flex h-full flex-col items-center justify-center py-12 text-center"
              role="status"
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 size={26} className="text-emerald-600" />
              </span>
              <h3 className="mb-1.5 text-[17px] font-semibold text-ink">
                {intent === "waitlist" ? "Waitlist request received" : "Application received"}
              </h3>
              <p className="max-w-[280px] text-[13px] font-medium leading-relaxed text-steel">
                Thank you. Our admissions team will contact you shortly with the next steps.
              </p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <ProgramSelection
                  form={form}
                  setForm={setForm}
                  selectedProgram={selectedProgram}
                />
              )}

              {step === 2 && (
                <PersonalInfo form={form} setForm={setForm} />
              )}

              {step === 3 && (
                <ReviewSubmit
                  form={form}
                  setForm={setForm}
                  selectedProgram={selectedProgram}
                  intent={intent}
                />
              )}

              {stepError && (
                <p role="alert" className="mt-3 text-[12.5px] font-medium text-primary">
                  {stepError}
                </p>
              )}
            </>
          )}
        </div>

        {!submitted && (
          <div className="border-t border-ink/5 px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="hidden text-[13px] leading-snug text-steel sm:block">
                {selectedProgram && intent === "enrollment" ? (
                  <>
                    <span className="font-semibold text-ink">
                      {formatPrice(selectedProgram.price)} total.
                    </span>{" "}
                    You&apos;ll choose payment in the final step.
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-ink">
                      {intent === "waitlist" ? "No payment is required for the waitlist." : "Choose a program to see pricing."}
                    </span>{" "}
                    A counselor contacts you first.
                  </>
                )}
              </p>

              <div className="flex shrink-0 gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1.5 rounded-xl border border-ink/10 px-4 py-3 text-[13.5px] font-semibold text-ink transition-colors hover:bg-ink/5"
                  >
                    <ChevronLeft size={15} />
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    Continue
                    <MoveRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isSubmitting ? "Submitting..." : (intent === "waitlist"
                      ? "Join waitlist"
                      : form.paymentMethod === "esewa"
                      ? "I've paid, submit application"
                      : "Submit application")}
                  </button>
                )}
              </div>
            </div>
            <p className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-[10.5px] font-medium text-steel">
              <ShieldCheck size={11} />
              Secure application · no spam · we respect your privacy
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
