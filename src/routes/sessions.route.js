import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  current,
} from "../controllers/sessions.controller.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/password.controller.js";

const sessionsRouter = Router();

sessionsRouter.get("/logout", logout);

sessionsRouter.post("/register", register);

sessionsRouter.post("/login", login);

sessionsRouter.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  current,
);

sessionsRouter.post("/forgot-password", forgotPassword);

sessionsRouter.post("/reset-password/:token", resetPassword);

export default sessionsRouter;
