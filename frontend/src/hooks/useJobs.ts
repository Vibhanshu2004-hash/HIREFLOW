"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/lib/types";
import { getApiErrorMessage, jobPortalService } from "@/services/jobService";
import { fallbackJobs } from "@/utils/dummyData";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await jobPortalService.getJobs();
        setJobs(data);
      } catch (err) {
        setJobs(fallbackJobs);
        setIsUsingFallback(true);
        setError(getApiErrorMessage(err, "Backend unavailable. Showing demo jobs."));
      } finally {
        setIsLoading(false);
      }
    }

    loadJobs();
  }, []);

  return {
    jobs,
    isLoading,
    error,
    isUsingFallback
  };
}
