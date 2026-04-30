import type { ApplicationStatus } from "@/lib/types";
import { getStatusTone } from "@/utils/status";

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold ${getStatusTone(status)}`}>
      {status}
    </span>
  );
}
