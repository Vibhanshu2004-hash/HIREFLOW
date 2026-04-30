import type { ApplicationStatus } from "@/lib/types";
import { applicationTimelineSteps, getTimelineProgress } from "@/utils/status";

export function StatusTimeline({ status }: { status: ApplicationStatus }) {
  const progress = getTimelineProgress(status);

  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {applicationTimelineSteps.map((step, index) => {
        const isComplete = index <= progress;
        const isCurrent = index === progress;

        return (
          <div key={step} className="flex items-center gap-2">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold transition ${
                isComplete
                  ? "border-forest-600 bg-forest-600 text-white"
                  : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {index + 1}
            </span>
            <span className={`text-xs font-semibold ${isCurrent ? "text-ink" : "text-slate-500"}`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
