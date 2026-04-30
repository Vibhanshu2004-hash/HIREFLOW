"use client";

import type { Job } from "@/lib/types";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

type JobCardProps = {
  job: Job;
  onApply?: (jobId: string) => void;
  onToggleSave?: (job: Job) => void;
  isSaved?: boolean;
  isApplying?: boolean;
};

export function JobCard({
  job,
  onApply,
  onToggleSave,
  isSaved = false,
  isApplying = false
}: JobCardProps) {
  return (
    <article className="group rounded-lg border border-forest-500/10 bg-surface p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-forest-500/30 hover:shadow-lift">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {job.type ? (
              <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
                {job.type}
              </span>
            ) : null}
            {job.salary ? (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                {job.salary}
              </span>
            ) : null}
          </div>
          <h3 className="text-xl font-bold text-ink transition group-hover:text-forest-700">
            {job.title}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Icon name="briefcase" className="h-4 w-4 text-forest-600" />
            {job.company}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Icon name="location" className="h-4 w-4 text-amber-600" />
            {job.location}
          </p>
          {job.description ? (
            <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-slate-600">
              {job.description}
            </p>
          ) : null}
        </div>

        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          {onToggleSave ? (
            <button
              onClick={() => onToggleSave(job)}
              className={`focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border transition ${
                isSaved
                  ? "border-amber-500/30 bg-amber-50 text-amber-600"
                  : "border-slate-200 bg-white text-slate-500 hover:border-forest-500/30 hover:text-forest-700"
              }`}
              aria-label={isSaved ? "Remove saved job" : "Save job"}
              title={isSaved ? "Saved" : "Save job"}
            >
              <Icon name="bookmark" className="h-5 w-5" />
            </button>
          ) : null}
          {onApply ? (
            <Button
              onClick={() => onApply(job._id)}
              disabled={isApplying}
              className="w-full gap-2 sm:w-auto"
            >
              {isApplying ? "Applying..." : "Apply"}
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
