import type { Job } from "@/lib/types";

export const fallbackJobs: Job[] = [
  {
    _id: "demo-product-engineer",
    title: "Product Engineer",
    company: "Northstar Labs",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $145k",
    description:
      "Build customer-facing workflows for a growing B2B SaaS platform with a strong product and design culture."
  },
  {
    _id: "demo-frontend-engineer",
    title: "Frontend Developer",
    company: "Ledgerly",
    location: "Bengaluru",
    type: "Hybrid",
    salary: "₹18L - ₹28L",
    description:
      "Own polished React interfaces, data-heavy dashboards, and reusable components for finance teams."
  },
  {
    _id: "demo-fullstack-engineer",
    title: "Full Stack Developer",
    company: "OrbitWorks",
    location: "Pune",
    type: "Full-time",
    salary: "₹16L - ₹24L",
    description:
      "Work across Node.js APIs, MongoDB data models, and modern Next.js experiences for operations teams."
  }
];
