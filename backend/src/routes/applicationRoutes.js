const express = require("express");
const {
  applyForJob,
  getApplications
} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply", protect, applyForJob);
router.get("/applications", protect, getApplications);

module.exports = router;
