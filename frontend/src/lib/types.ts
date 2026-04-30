export type User = {
  id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  type?: string;
  salary?: string;
  description?: string;
  createdBy?: {
    name?: string;
    email?: string;
  };
  createdAt?: string;
};

export type ApplicationStatus = "Applied" | "Under Review" | "Shortlisted" | "Rejected";

export type Application = {
  _id: string;
  status: ApplicationStatus;
  createdAt?: string;
  job: Job;
};
