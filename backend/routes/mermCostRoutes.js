import express from "express";
import getCostsByMonth from "../controllers/mermCostController.js";
const router = express.Router();
// Ruta que recibe el año y mes a consultar, p. ej. GET /costes/2025/05 para mayo de 2025
router.get("/merm-cost/:year/:month", getCostsByMonth);
export default router;