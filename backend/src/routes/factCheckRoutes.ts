import { Router } from "express";
import { getFactCheck } from "../controllers/factCheckController";

const router = Router();

router.get("/fact-check", getFactCheck);

export default router;
