"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { Icon } from "@/components/Icon";
import { JobCard } from "@/components/JobCard";
import { SectionHeader } from "@/components/SectionHeader";
import { authService } from "@/services/authService";
import { getApiErrorMessage, jobPortalService } from "@/services/jobService";
import { savedJobsService } from "@/services/savedJobsService";
import { useJobs } from "@/hooks/useJobs";
import { useSavedJobs } from "@/hooks/useSavedJobs";

export const dynamic = "force-dynamic";

export default function JobsPage() {
  const { jobs, isLoading, error, isUsingFallback } = useJobs();
  const { savedJobs, isSaved, toggleSavedJob } = useSavedJobs();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [applyError, setApplyError] = useState("");

  const filteredJobs = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    const locationTerm = location.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        [job.title, job.company, job.description].some((value) =>
          value?.toLowerCase().includes(searchTerm)
        );
      const matchesLocation = !locationTerm || job.location.toLowerCase().includes(locationTerm);

      return matchesSearch && matchesLocation;
    });
  }, [jobs, query, location]);

  const recommendedJobs = useMemo(() => filteredJobs.slice(0, 2), [filteredJobs]);

  async function applyToJob(jobId: string) {
    setMessage("");
    setApplyError("");

    if (!authService.getToken()) {
      setApplyError("Please log in before applying. Your saved jobs will stay here.");
      return;
    }

    const selectedJob = jobs.find((job) => job._id === jobId);
    setApplyingId(jobId);

    try {
      await jobPortalService.applyToJob(jobId);
      if (selectedJob) savedJobsService.saveLocalApplication(selectedJob);
      setMessage("Application submitted. Your dashboard timeline has been updated.");
    } catch (err) {
      setApplyError(getApiErrorMessage(err, "Application could not be submitted."));
    } finally {
      setApplyingId(null);
    }
  }

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Open roles"
            title="Find your next move"
            description="Search, save, and apply to roles with a clean workflow built for repeat use."
          />
          <Link href="/dashboard" className="text-sm font-semibold text-forest-700 hover:text-forest-600">
            View dashboard
          </Link>
        </div>

        <div className="mb-6 grid gap-3 rounded-lg border border-forest-500/10 bg-surface p-4 shadow-sm md:grid-cols-[1fr_1fr_auto]">
          <label>
            <span className="text-sm font-medium text-slate-700">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
              placeholder="Title, company, or keyword"
            />
          </label>
          <label>
            <span className="text-sm font-medium text-slate-700">Location</span>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
              placeholder="Remote, Bengaluru, New York"
            />
          </label>
          <div className="flex items-end">
            <div className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-forest-50 px-4 text-sm font-semibold text-forest-700">
              <Icon name="filter" className="h-4 w-4" />
              {filteredJobs.length} matches
            </div>
          </div>
        </div>

        {isUsingFallback || error ? (
          <div className="mb-5 rounded-md border border-amber-500/25 bg-amber-50 px-4 py-3 text-sm text-amber-600">
            {error}
          </div>
        ) : null}
        {message ? (
          <div className="mb-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}
        {applyError ? (
          <div className="mb-5 rounded-md border border-coral-500/25 bg-coral-50 px-4 py-3 text-sm text-coral-600">
            {applyError}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            {isLoading ? (
              <div className="rounded-lg border border-forest-500/10 bg-surface p-8 text-center text-sm text-slate-500">
                Loading jobs...
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid gap-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onApply={applyToJob}
                    onToggleSave={toggleSavedJob}
                    isSaved={isSaved(job._id)}
                    isApplying={applyingId === job._id}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No matching jobs"
                description="Try a broader keyword, remove location filters, or check back when new roles are added."
              />
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-forest-500/10 bg-surface p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Saved jobs</p>
              <p className="mt-2 text-3xl font-bold text-ink">{savedJobs.length}</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Bookmark roles you want to revisit before applying.
              </p>
            </div>
            <div className="rounded-lg border border-forest-500/10 bg-surface p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Recommended jobs</p>
              <div className="mt-4 space-y-3">
                {recommendedJobs.map((job) => (
                  <div key={job._id} className="rounded-md bg-forest-50 p-3">
                    <p className="text-sm font-bold text-ink">{job.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{job.company}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
