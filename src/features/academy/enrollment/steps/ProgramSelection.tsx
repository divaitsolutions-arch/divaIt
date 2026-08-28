import { useState } from "react";
import { ChevronDown, Flame, Building2, Monitor, FileText } from "lucide-react";
import { useEnrollmentModal } from "@/features/academy/enrollment/contexts/EnrollmentModalContext";
import { FormState, ProgramOption } from "../types";

import { formatPrice } from "../utils";
import { ProgramGroupList, ModeCard } from "../components/SharedUI";

interface Props {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  selectedProgram?: ProgramOption;
}

export function ProgramSelection({ form, setForm, selectedProgram }: Props) {
  const [programOpen, setProgramOpen] = useState(false);
  const { programOptions } = useEnrollmentModal();

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <label className="mb-2 block text-[13px] font-medium text-ink">
          Select program <span className="text-primary">*</span>
        </label>
        <button
          type="button"
          onClick={() => setProgramOpen((o) => !o)}
          className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-colors ${
            programOpen
              ? "border-primary ring-1 ring-primary"
              : "border-ink/10 hover:border-ink/20"
          }`}
        >
          <span className="min-w-0">
            {selectedProgram ? (
              <>
                <span className="block truncate text-[14px] font-medium text-ink">
                  {selectedProgram.title}
                </span>
                {(selectedProgram.duration ||
                  selectedProgram.level ||
                  selectedProgram.price) && (
                  <span className="mt-0.5 block truncate text-[13px] font-medium text-steel">
                    {[
                      selectedProgram.duration,
                      selectedProgram.level,
                      selectedProgram.price
                        ? formatPrice(selectedProgram.price)
                        : undefined,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[14px] font-medium text-steel">
                Choose a track…
              </span>
            )}
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-steel transition-transform ${
              programOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {selectedProgram?.popular && (
          <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-orange-600">
            <Flame size={11} />
            Most popular choice
          </span>
        )}

        {programOpen && (
          <div className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-ink/10 bg-white p-1.5 shadow-xl">
            <ProgramGroupList
              label="Career tracks"
              options={programOptions.filter((p) => p.group === "career")}
              onSelect={(title) => {
                setForm((f) => ({ ...f, program: title }));
                setProgramOpen(false);
              }}
            />
            <ProgramGroupList
              label="Creator monetization packages"
              options={programOptions.filter((p) => p.group === "package")}
              onSelect={(title) => {
                setForm((f) => ({ ...f, program: title }));
                setProgramOpen(false);
              }}
            />
            <ProgramGroupList
              label="Short courses"
              options={programOptions.filter((p) => p.group === "individual")}
              onSelect={(title) => {
                setForm((f) => ({ ...f, program: title }));
                setProgramOpen(false);
              }}
            />
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium text-ink">
          Class mode <span className="text-primary">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <ModeCard
            icon={Building2}
            title="Physical"
            subtitle="In-person classes"
            active={form.mode === "physical"}
            onClick={() => setForm((f) => ({ ...f, mode: "physical" }))}
          />
          <ModeCard
            icon={Monitor}
            title="Online"
            subtitle="Live interactive classes"
            active={form.mode === "online"}
            onClick={() => setForm((f) => ({ ...f, mode: "online" }))}
          />
        </div>
      </div>

      <div className="mt-1 flex items-start gap-3 rounded-xl border border-dashed border-ink/10 p-4">
        <FileText size={16} className="mt-0.5 shrink-0 text-steel" />
        <p className="text-[12.5px] font-medium leading-relaxed text-steel">
          Not sure which track fits? A counselor can walk you through outcomes
          and pricing before you commit. Just continue and note your interest.
        </p>
      </div>
    </div>
  );
}
