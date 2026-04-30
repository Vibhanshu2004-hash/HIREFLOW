"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApplicationCard } from "@/components/ApplicationCard";
import { Container } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { JobCard } from "@/components/JobCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { authService } from "@/services/authService";
import { getApiErrorMessage, jobPortalService } from "@/services/jobService";
import { savedJobsService } from "@/services/savedJobsService";
import { useJobs } from "@/hooks/useJobs";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import type { Application, User } from "@/lib/types";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const router = useRouter();
  const { jobs } = useJobs();
  const { savedJobs, isSaved, toggleSavedJob } = useSavedJobs();
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authService.getToken()) {
      router.push("/login");
      return;
    }

    setUser(authService.getCurrentUser());

    async function fetchApplications() {
      try {
        const data = await jobPortalService.getApplications();
        setApplications(data.length ? data : savedJobsService.getLocalApplications());
      } catch (err) {
        setApplications(savedJobsService.getLocalApplications());
        setError(getApiErrorMessage(err, "Could not reach the backend. Showing local application history."));
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplications();
  }, [router]);

  const activeApplications = useMemo(
    () => applications.filter((application) => application.status !== "Rejected").length,
    [applications]
  );

  const recommendedJobs = useMemo(() => {
    const savedJobIds = new Set(savedJobs.map((job) => job._id));
    return jobs.filter((job) => !savedJobIds.has(job._id)).slice(0, 2);
  }, [jobs, savedJobs]);

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Dashboard"
            title={user ? `${user.name}'s job pipeline` : "Your job pipeline"}
            description="Track applications, revisit saved jobs, and keep your search moving with a clear status timeline."
          />
          <Link href="/jobs" className="text-sm font-semibold text-forest-700 hover:text-forest-600">
            Browse more jobs
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <StatCard
            label="Total Applications"
            value={applications.length}
            icon="check"
            helper="Roles you have submitted through HireFlow."
          />
          <StatCard
            label="Active Jobs"
            value={activeApplications}
            icon="briefcase"
            helper="Applications still moving through the pipeline."
          />
          <StatCard
            label="Saved Jobs"
            value={savedJobs.length}
            icon="bookmark"
            helper="Bookmarked roles to revisit before applying."
          />
        </div>

        {error ? (
          <div className="mb-5 rounded-md border border-amber-500/25 bg-amber-50 px-4 py-3 text-sm text-amber-600">
            {error}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">Application tracking</h2>
              <span className="text-sm text-slate-500">{applications.length} total</span>
            </div>

            {isLoading ? (
              <div className="rounded-lg border border-forest-500/10 bg-surface p-8 text-center text-sm text-slate-500">
                Loading applications...
              </div>
            ) : applications.length > 0 ? (
              <div className="grid gap-4">
                {applications.map((application) => (
                  <ApplicationCard key={application._id} application={application} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No applications yet"
                description="Apply to your first role and the tracking timeline will appear here automatically."
                actionHref="/jobs"
                actionLabel="Browse jobs"
              />
            )}
          </div>

          <aside className="space-y-6">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-ink">Saved jobs</h2>
                <span className="text-sm text-slate-500">{savedJobs.length}</span>
              </div>
              {savedJobs.length > 0 ? (
                <div className="space-y-4">
                  {savedJobs.slice(0, 3).map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onToggleSave={toggleSavedJob}
                      isSaved={isSaved(job._id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No saved jobs"
                  description="Use the bookmark button on a job card to build a shortlist."
                  actionHref="/jobs"
                  actionLabel="Find jobs"
                />
              )}
            </section>

            <section className="rounded-lg border border-forest-500/10 bg-surface p-5 shadow-sm">
              <h2 className="text-xl font-bold text-ink">Recommended next</h2>
              <div className="mt-4 space-y-3">
                {recommendedJobs.length > 0 ? (
                  recommendedJobs.map((job) => (
                    <div key={job._id} className="rounded-md bg-forest-50 p-3">
                      <p className="text-sm font-bold text-ink">{job.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{job.company}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-slate-500">
                    Save or apply to jobs to unlock better recommendations.
                  </p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </Container>
    </section>
  );
}
