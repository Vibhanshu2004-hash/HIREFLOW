import axios, { AxiosError } from "axios";
import type { Application, ApplicationStatus, AuthResponse, Job, User } from "@/lib/types";

type ApiErrorBody = {
  message?: string;
  error?: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = LoginPayload & {
  name: string;
};

type RawAuthResponse = Partial<AuthResponse> & {
  data?: Partial<AuthResponse>;
  user?: Partial<User> & { _id?: string };
};

type RawApplication = {
  _id: string;
  status: string;
  createdAt?: string;
  job?: Job;
  jobId?: Job;
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("hireflow_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong.") {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? error.response?.data?.error ?? error.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

function normalizeAuthResponse(response: RawAuthResponse): AuthResponse {
  const payload = response.data ?? response;
  const user = (payload.user ?? {}) as Partial<User> & { _id?: string };

  if (!payload.token) {
    throw new AxiosError("Authentication response did not include a token.");
  }

  return {
    token: payload.token,
    user: {
      id: user.id ?? user._id ?? "",
      name: user.name ?? "",
      email: user.email ?? "",
      role: user.role
    }
  };
}

function normalizeApplicationStatus(status: string): ApplicationStatus {
  if (status === "under_review" || status === "Under Review") return "Under Review";
  if (status === "shortlisted") return "Shortlisted";
  if (status === "rejected") return "Rejected";
  return "Applied";
}

function normalizeApplication(application: RawApplication): Application {
  const job = application.job ?? application.jobId;

  return {
    _id: application._id,
    status: normalizeApplicationStatus(application.status),
    createdAt: application.createdAt,
    job: job ?? {
      _id: "",
      title: "Deleted job",
      company: "Unknown company",
      location: "Unknown location"
    }
  };
}

export const jobPortalService = {
  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<RawAuthResponse>("/auth/login", payload);
    return normalizeAuthResponse(data);
  },

  async register(payload: RegisterPayload) {
    const { data } = await apiClient.post<RawAuthResponse>("/auth/register", payload);
    return normalizeAuthResponse(data);
  },

  async getJobs() {
    const { data } = await apiClient.get<Job[] | { jobs: Job[] }>("/jobs");
    return Array.isArray(data) ? data : data.jobs;
  },

  async applyToJob(jobId: string) {
    const { data } = await apiClient.post("/apply", { jobId });
    return data;
  },

  async getApplications() {
    const { data } = await apiClient.get<RawApplication[]>("/applications");
    return data.map(normalizeApplication);
  }
};
