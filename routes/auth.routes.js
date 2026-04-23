import express from 'express';
import { getUsers, signUp, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/api/signup", signUp);
router.post("/api/login", login);

export default router;
