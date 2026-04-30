import type { ApplicationStatus } from "@/lib/types";

export const applicationTimelineSteps: ApplicationStatus[] = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Rejected"
];

export function getStatusTone(status: ApplicationStatus) {
  if (status === "Shortlisted") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Rejected") {
    return "border-coral-500/25 bg-coral-50 text-coral-600";
  }

  if (status === "Under Review") {
    return "border-amber-500/25 bg-amber-50 text-amber-600";
  }

  return "border-forest-500/20 bg-forest-50 text-forest-700";
}

export function getTimelineProgress(status: ApplicationStatus) {
  const index = applicationTimelineSteps.indexOf(status);
  return index < 0 ? 0 : index;
}
