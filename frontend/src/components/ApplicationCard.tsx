import type { Application } from "@/lib/types";
import { Icon } from "@/components/Icon";
import { StatusBadge } from "@/components/StatusBadge";
import { StatusTimeline } from "@/components/StatusTimeline";

export function ApplicationCard({ application }: { application: Application }) {
  return (
    <article className="rounded-lg border border-forest-500/10 bg-surface p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink">{application.job.title}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Icon name="briefcase" className="h-4 w-4 text-forest-600" />
            {application.job.company}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Icon name="location" className="h-4 w-4 text-amber-600" />
            {application.job.location}
          </p>
          {application.createdAt ? (
            <p className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400">
              <Icon name="clock" className="h-4 w-4" />
              Applied {new Date(application.createdAt).toLocaleDateString()}
            </p>
          ) : null}
        </div>
        <StatusBadge status={application.status} />
      </div>

      <StatusTimeline status={application.status} />
    </article>
  );
}
