const { Router } = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
