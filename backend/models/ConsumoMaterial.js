import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const ConsumoMaterial = db.define('consumo_materiales', {
    Material: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Capa: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    SKU: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    Base: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Tipo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Cantidad: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
    {
        timestamps: false
    }
);

export default ConsumoMaterial;