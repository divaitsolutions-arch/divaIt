"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { EnrollmentIntent, ProgramOption } from "../types";

interface EnrollmentModalContextValue {
  isOpen: boolean;
  preselectedProgram?: string;
  intent: EnrollmentIntent;
  programOptions: ProgramOption[];
  openModal: (program?: string, intent?: EnrollmentIntent) => void;
  closeModal: () => void;
}

const EnrollmentModalContext = createContext<EnrollmentModalContextValue | null>(
  null
);

export function EnrollmentModalProvider({
  children,
  programOptions,
}: {
  children: ReactNode;
  programOptions: ProgramOption[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedProgram, setPreselectedProgram] = useState<string | undefined>();
  const [intent, setIntent] = useState<EnrollmentIntent>("enrollment");
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (window.location.hash === "#enroll-modal") {
      setTimeout(() => setIsOpen(true), 0);
      window.history.replaceState(
        {},
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  const openModal = (program?: string, nextIntent: EnrollmentIntent = "enrollment") => {
    if (program) setPreselectedProgram(program);
    setIntent(nextIntent);
    setIsOpen(true);
    window.history.replaceState(
      {},
      "",
      window.location.pathname + window.location.search
    );
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <EnrollmentModalContext.Provider value={{ isOpen, preselectedProgram, intent, programOptions, openModal, closeModal }}>
      {children}
    </EnrollmentModalContext.Provider>
  );
}

export function useEnrollmentModal() {
  const ctx = useContext(EnrollmentModalContext);
  if (!ctx) {
    throw new Error(
      "useEnrollmentModal must be used within an EnrollmentModalProvider"
    );
  }
  return ctx;
}
