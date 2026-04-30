const express = require("express");
const { createJob, getJobs } = require("../controllers/jobController");
const { adminOnly, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getJobs).post(protect, adminOnly, createJob);

module.exports = router;
