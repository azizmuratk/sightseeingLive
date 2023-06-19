import express from "express";

import {
  registerController,
  loginController,
  testController,
  forgotPasswordController
} from "../controllers/auth.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", registerController);

router.post("/signin", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
