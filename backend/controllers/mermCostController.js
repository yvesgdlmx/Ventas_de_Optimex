import MermCost from "../models/MermCost.js";
import { fn, col, where } from "sequelize";
const getCostsByMonth = async (req, res) => {
  const { month } = req.params;
  const monthNumber = parseInt(month, 10);
  try {
    const results = await MermCost.findAll({
      where: where(fn("MONTH", col("fecha")), monthNumber)
    });
    res.json(results);
  } catch (error) {
    console.error("Error al consultar los costes por mes:", error);
    res.status(500).json({
      msg: "Ocurrió un error al obtener los datos",
      error: error.message
    });
  }
};
export default getCostsByMonth;