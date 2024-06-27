import express from 'express'
import { obtenerRegistros, obtenerRegistrosPorMes } from '../controllers/ordersController.js';

const router = express.Router();

router.get("/get-all", obtenerRegistros);
router.get('/get-month/:mes', obtenerRegistrosPorMes);

export default router;