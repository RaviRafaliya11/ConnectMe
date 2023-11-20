import { Router } from "express";
import {
  checkUser,
  createNewUser,
  generateToken,
  getAllUsers,
} from "../controllers/AuthController.js";

const router = Router();
router.post("/check-user", checkUser);
router.post("/create-new-user", createNewUser);
router.get("/get-contacts", getAllUsers);
router.get("/generate-token/:userId", generateToken);

export default router;

// kesemi@tutuapp.bid
