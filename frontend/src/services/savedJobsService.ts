"use client";

import type { Application, Job } from "@/lib/types";

const SAVED_JOBS_KEY = "hireflow_saved_jobs";
const LOCAL_APPLICATIONS_KEY = "hireflow_applications";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) return fallback;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const savedJobsService = {
  getSavedJobs() {
    return readJson<Job[]>(SAVED_JOBS_KEY, []);
  },

  isSaved(jobId: string) {
    return this.getSavedJobs().some((job) => job._id === jobId);
  },

  toggleSavedJob(job: Job) {
    const savedJobs = this.getSavedJobs();
    const isAlreadySaved = savedJobs.some((savedJob) => savedJob._id === job._id);
    const nextSavedJobs = isAlreadySaved
      ? savedJobs.filter((savedJob) => savedJob._id !== job._id)
      : [job, ...savedJobs];

    writeJson(SAVED_JOBS_KEY, nextSavedJobs);
    return nextSavedJobs;
  },

  getLocalApplications() {
    return readJson<Application[]>(LOCAL_APPLICATIONS_KEY, []);
  },

  saveLocalApplication(job: Job) {
    const applications = this.getLocalApplications();
    const existing = applications.find((application) => application.job._id === job._id);

    if (existing) {
      return applications;
    }

    const nextApplications: Application[] = [
      {
        _id: `${job._id}-${Date.now()}`,
        status: "Applied",
        createdAt: new Date().toISOString(),
        job
      },
      ...applications
    ];

    writeJson(LOCAL_APPLICATIONS_KEY, nextApplications);
    return nextApplications;
  }
};
