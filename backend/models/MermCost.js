import { DataTypes } from "sequelize";
import db from "../config/db.js";
const MermCost = db.define("costos_mensuales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  suma_cost: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  suma_cost_merm: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  timestamps: false
});
export default MermCost;