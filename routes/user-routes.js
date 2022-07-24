import express from "express";
import { getAllUser, singnup, login } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUser);

router.post("/signup", singnup);

router.get("/login", login);

export default router;