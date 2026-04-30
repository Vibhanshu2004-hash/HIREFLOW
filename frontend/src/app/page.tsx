import { Container } from "@/components/Container";
import { Icon } from "@/components/Icon";
import { JobCard } from "@/components/JobCard";
import { LinkButton } from "@/components/Button";
import { fallbackJobs } from "@/utils/dummyData";

export const dynamic = "force-dynamic";

const metrics = [
  { value: "2.4x", label: "faster application follow-up" },
  { value: "84%", label: "candidates track every status" },
  { value: "12k+", label: "roles organized monthly" }
];

const workflow = ["Discover matched roles", "Save roles worth revisiting", "Apply and track the pipeline"];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-forest-500/10">
        <Container className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest-500/15 bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-700">
              <Icon name="spark" className="h-4 w-4" />
              Job search command center
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-ink sm:text-5xl lg:text-6xl">
              Manage every job opportunity from first look to final decision.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              HireFlow turns a scattered job search into a clean workspace with saved roles,
              focused applications, and a timeline that keeps every next step visible.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/jobs" className="gap-2">
                Browse jobs
                <Icon name="arrow" className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/register" variant="secondary">
                Create account
              </LinkButton>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-forest-500/10 bg-surface/75 p-4">
                  <p className="text-2xl font-bold text-ink">{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-4 shadow-lift">
            <div className="rounded-md bg-surface p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Today&apos;s focus</p>
                  <h2 className="mt-1 text-2xl font-bold text-ink">Frontend Developer</h2>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                  Recommended
                </span>
              </div>

              <div className="space-y-3">
                {workflow.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-md border border-forest-500/10 bg-white/75 p-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-forest-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-forest-700">
                Recommended
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ink">Roles worth a look</h2>
            </div>
            <LinkButton href="/jobs" variant="secondary" className="w-full sm:w-auto">
              See all jobs
            </LinkButton>
          </div>
          <div className="grid gap-4">
            {fallbackJobs.slice(0, 2).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
