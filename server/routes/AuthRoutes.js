import { Router } from "express";
import {
  checkUser,
  createNewUser,
  generateToken,
  getAllUsers,
  updateUserPremiumStatus,
} from "../controllers/AuthController.js";

const router = Router();
router.post("/check-user", checkUser);
router.post("/create-new-user", createNewUser);
router.post("/updateUserPremiumStatus", updateUserPremiumStatus);
router.get("/get-contacts", getAllUsers);
router.get("/generate-token/:userId", generateToken);

export default router;

// kesemi@tutuapp.bid
