import { useState } from "react";
import { z } from "zod";
import { EnrollmentIntent, FormState } from "../types";
import { useEnrollmentModal } from "@/features/academy/enrollment/contexts/EnrollmentModalContext";


const Step1Schema = z.object({
  program: z.string().min(1, "Please select a program."),
  mode: z.string().min(1, "Please select a class mode."),
});

const Step2Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number."),
  email: z.string().email("Please enter a valid email address.").or(z.literal('')),
  district: z.string().min(1, "Please select a district."),
});

const INITIAL_FORM: FormState = {
  program: "",
  mode: "",
  name: "",
  phone: "",
  email: "",
  district: "",
  hearAbout: "",
  paymentMethod: "",
};

export function useEnrollmentForm() {
  const { intent: preselectedIntent, preselectedProgram, closeModal, programOptions } = useEnrollmentModal();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({ ...INITIAL_FORM, program: preselectedProgram || "" });
  const [stepError, setStepError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProgram = programOptions.find((p) => p.title === form.program);
  const currentIntent: EnrollmentIntent = selectedProgram?.availability ?? preselectedIntent;

  const goNext = () => {
    if (step === 1) {
      const result = Step1Schema.safeParse(form);
      if (!result.success) {
        setStepError(result.error.issues[0].message);
        return;
      }
      if (!selectedProgram) {
        setStepError("Please choose a program from the list.");
        return;
      }
    } else if (step === 2) {
      const result = Step2Schema.safeParse(form);
      if (!result.success) {
        setStepError(result.error.issues[0].message);
        return;
      }
    }

    setStepError("");
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setStepError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    if (!selectedProgram) {
      setStepError("Please choose a program from the list.");
      return;
    }
    if (currentIntent === "enrollment" && !form.paymentMethod) {
      setStepError("Please select a payment method to continue.");
      return;
    }
    setStepError("");
    setIsSubmitting(true);

    try {
      const messageBody = `
${currentIntent === "waitlist" ? "Waitlist Request" : "Enrollment Request"}:
- Program: ${form.program}
- Mode: ${form.mode}
- District: ${form.district}
- Payment Method: ${form.paymentMethod || 'Not selected'}
- Heard About Us: ${form.hearAbout || 'Not specified'}
      `.trim();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email || "No Email Provided",
          phone: form.phone,
          inquiryType: 'learning',
          message: messageBody,
        })
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch {
      setIsSubmitting(false);
      setStepError(`Failed to submit your ${currentIntent === "waitlist" ? "waitlist request" : "application"}. Please try again or contact us directly.`);
    }
  };

  return {
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
    intent: currentIntent,
  };
}
