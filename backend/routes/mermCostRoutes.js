import express from "express";
import getCostsByMonth from "../controllers/mermCostController.js";
const router = express.Router();
// Ruta que recibe el mes a consultar, p. ej. GET /costes/05 para mayo
router.get("/merm-cost/:month", getCostsByMonth);
export default router;