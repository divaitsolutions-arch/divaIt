"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useEnrollmentModal } from "@/features/academy/enrollment/contexts/EnrollmentModalContext";
import { EnrollmentWizard } from "./EnrollmentWizard";

export function EnrollmentModal() {
  const { isOpen, closeModal } = useEnrollmentModal();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Element that had focus before the modal opened, so we can restore it
  // on close instead of dropping focus back to <body>.
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Escape to close + focus trap while open.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Trap focus inside the dialog so Tab/Shift+Tab can't escape into
      // background content that's still visually hidden behind the overlay.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Move focus in on open, lock body scroll, and restore both on close.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-md transition-opacity"
        onClick={closeModal}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-4xl"
      >
        <button
          ref={closeButtonRef}
          onClick={closeModal}
          className="absolute -right-3 -top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-steel shadow-lg transition-colors hover:text-ink"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <EnrollmentWizard />
      </div>
    </div>
  );
}