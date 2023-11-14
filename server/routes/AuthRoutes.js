import { Router } from "express";
import {
  checkUser,
  createNewUser,
  getAllUsers,
} from "../controllers/AuthController.js";

const router = Router();
router.post("/check-user", checkUser);
router.post("/create-new-user", createNewUser);
router.get("/get-contacts", getAllUsers);

export default router;
