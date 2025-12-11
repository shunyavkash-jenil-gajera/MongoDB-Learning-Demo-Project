import { Router } from "express";
import { signIn, signUp } from "../controllers/auth/index.auth.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../validation/auth.validation.js";

const router = Router();

// for signUp user
router.post("/sign-up", validate(userRegisterSchema), signUp);

// for logIn user
router.post("/log-in", validate(userLoginSchema), signIn);

export default router;
