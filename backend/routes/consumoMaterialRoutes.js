import express from 'express';
import { obtenerRegistrosPorMesYAno } from '../controllers/consumoMaterialController.js';

const router = express.Router()

router.get('/get-month/:mes/:ano', obtenerRegistrosPorMesYAno);

export default router;