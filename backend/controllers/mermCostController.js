import MermCost from "../models/MermCost.js";
import { fn, col, where, Op } from "sequelize";
const getCostsByMonth = async (req, res) => {
  const { year, month } = req.params;
  const yearNumber = parseInt(year, 10);
  const monthNumber = parseInt(month, 10);
  try {
    const results = await MermCost.findAll({
      where: {
        [Op.and]: [
          where(fn("YEAR", col("fecha")), yearNumber),
          where(fn("MONTH", col("fecha")), monthNumber)
        ]
      }
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