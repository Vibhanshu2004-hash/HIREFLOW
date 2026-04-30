const Job = require("../models/Job");
const asyncHandler = require("../utils/asyncHandler");

const createJob = asyncHandler(async (req, res) => {
  const { title, company, description, location } = req.body;

  if (!title || !company || !description || !location) {
    res.status(400);
    throw new Error("Title, company, description, and location are required.");
  }

  const job = await Job.create({
    title,
    company,
    description,
    location,
    createdBy: req.user._id
  });

  res.status(201).json(job);
});

const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  res.json(jobs);
});

module.exports = {
  createJob,
  getJobs
};
