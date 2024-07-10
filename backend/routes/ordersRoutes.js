import express from 'express';
import { obtenerRegistros, obtenerRegistrosPorMes, obtenerRegistrosPorRangoFechas, obtenerRegistrosPorSemana } from '../controllers/ordersController.js';

const router = express.Router();

router.get("/get-all", obtenerRegistros);
router.get('/get-month/:mes', obtenerRegistrosPorMes);
router.get('/get-week/:ano/:mes/:semana', obtenerRegistrosPorSemana); // Cambiado 'año' por 'ano'
router.get('/get-by-date/:fechaInicio/:fechaFin', obtenerRegistrosPorRangoFechas); // Cambiado 'año' por 'ano'


export default router;