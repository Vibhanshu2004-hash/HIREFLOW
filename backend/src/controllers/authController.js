const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

function formatUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, adminSecret } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409);
    throw new Error("A user with this email already exists.");
  }

  const requestedRole =
    role === "admin" && adminSecret === process.env.ADMIN_REGISTRATION_SECRET ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password,
    role: requestedRole
  });

  res.status(201).json({
    token: generateToken(user),
    user: formatUser(user)
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required.");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  res.json({
    token: generateToken(user),
    user: formatUser(user)
  });
});

module.exports = {
  register,
  login
};
