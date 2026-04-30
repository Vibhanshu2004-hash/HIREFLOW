import { Icon } from "@/components/Icon";

type StatCardProps = {
  label: string;
  value: number | string;
  icon: "bookmark" | "briefcase" | "check";
  helper: string;
};

export function StatCard({ label, value, icon, helper }: StatCardProps) {
  return (
    <div className="rounded-lg border border-forest-500/10 bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold text-ink">{value}</p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-md bg-forest-50 text-forest-700">
          <Icon name={icon} />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{helper}</p>
    </div>
  );
}
