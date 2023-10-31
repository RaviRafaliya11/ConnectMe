import { Router } from "express";
import { checkUser, createNewUser } from "../controllers/AuthController.js";

const router = Router();
router.post("/check-user", checkUser);
router.post("/create-new-user", createNewUser);

export default router;
