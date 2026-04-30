import type { ReactNode, SVGProps } from "react";

type IconName =
  | "arrow"
  | "bookmark"
  | "briefcase"
  | "check"
  | "clock"
  | "filter"
  | "location"
  | "lock"
  | "mail"
  | "spark"
  | "user";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  bookmark: <path d="M6 4h12v16l-6-3-6 3V4Z" />,
  briefcase: <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1m-9 0h14v13H5V6Zm0 5h14" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <path d="M12 6v6l4 2m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  filter: <path d="M4 6h16M7 12h10m-7 6h4" />,
  location: <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  lock: <path d="M7 11V8a5 5 0 0 1 10 0v3m-11 0h12v10H6V11Z" />,
  mail: <path d="M4 6h16v12H4V6Zm0 1 8 6 8-6" />,
  spark: <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Zm7 10 .8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8L19 13Z" />,
  user: <path d="M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
};

export function Icon({ name, className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
