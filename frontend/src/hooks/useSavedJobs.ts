"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/lib/types";
import { savedJobsService } from "@/services/savedJobsService";

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    setSavedJobs(savedJobsService.getSavedJobs());
  }, []);

  function toggleSavedJob(job: Job) {
    setSavedJobs(savedJobsService.toggleSavedJob(job));
  }

  function isSaved(jobId: string) {
    return savedJobs.some((job) => job._id === jobId);
  }

  return {
    savedJobs,
    savedJobCount: savedJobs.length,
    isSaved,
    toggleSavedJob
  };
}
