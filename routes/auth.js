const { Router } = require("@sugo/router");
const router = new Router();
const User = require("../models/User");
const { signToken } = require("../services");
const { authenticate } = require("../middleware");
const { ResourceNotFound, InvalidPasswordError } = require("../exceptions");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ResourceNotFound("No user was found for the given token");
  const authenticated = await user.verifyPassword(password);
  if (!authenticated) throw new InvalidPasswordError(`User was found but password did not match, value ${password}`);
  const token = await signToken({ _id: user._id });
  return res.json({
    user,
    token
  });
});

router.get("/verify", authenticate, async (req, res) =>
  res.json({
    user: req.user,
    token: await signToken({ _id: req.user._id })
  })
);

module.exports = router;
