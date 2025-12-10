import { Router } from "express";
import use from "../errorHandler/globle.error.handler.js";
import { signIn, signUp } from "../controllers/auth/index.auth.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../validation/auth.validation.js";

const router = Router();

router.post("/register", validate(userRegisterSchema), use(signUp));
router.post("/login", validate(userLoginSchema), use(signIn));

export default router;
