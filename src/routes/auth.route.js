import { Router } from "express";
import use from "../errorHandler/globle.error.handler.js";
import { signIn, signUp } from "../controllers/auth/index.auth.js";

const router = Router();

router.post("/register", use(signUp));
router.post("/login", use(signIn));

export default router;
