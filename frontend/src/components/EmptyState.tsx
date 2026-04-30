import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({ title, description, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-forest-500/25 bg-surface/80 p-8 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest-50 text-forest-700">
        <Icon name="spark" />
      </span>
      <h2 className="mt-4 text-lg font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {actionHref && actionLabel ? (
        <LinkButton href={actionHref} className="mt-5">
          {actionLabel}
        </LinkButton>
      ) : null}
    </div>
  );
}
