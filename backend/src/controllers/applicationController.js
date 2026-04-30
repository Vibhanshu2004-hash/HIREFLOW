const Application = require("../models/Application");
const Job = require("../models/Job");
const asyncHandler = require("../utils/asyncHandler");

const applyForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) {
    res.status(400);
    throw new Error("jobId is required.");
  }

  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found.");
  }

  const existingApplication = await Application.findOne({
    userId: req.user._id,
    jobId
  });

  if (existingApplication) {
    res.status(409);
    throw new Error("You have already applied to this job.");
  }

  const application = await Application.create({
    userId: req.user._id,
    jobId,
    status: "applied"
  });

  const populatedApplication = await application.populate([
    { path: "jobId", select: "title company description location" },
    { path: "userId", select: "name email" }
  ]);

  res.status(201).json({
    message: "Application submitted successfully.",
    application: populatedApplication
  });
});

const getApplications = asyncHandler(async (req, res) => {
  const query = req.user.role === "admin" ? {} : { userId: req.user._id };

  const applications = await Application.find(query)
    .populate("userId", "name email")
    .populate("jobId", "title company description location")
    .sort({ createdAt: -1 });

  res.json(applications);
});

module.exports = {
  applyForJob,
  getApplications
};
