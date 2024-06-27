import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Orders = db.define('orders', {
    Patient: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    LensStyle: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    LensMaterial: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    LensColor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    LensOrdered: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    LensSupplied: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    LensPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    ARCoating: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Mirror: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    CoatingsPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Tint: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    TintOrdered: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TintPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    JobType: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    ShipDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    TAT: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: false
    },
    Redo: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, 
    {
        timestamps: false
    }
);

export default Orders;