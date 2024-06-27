import { Sequelize } from "sequelize";
import Orders from "../models/Orders.js";

const obtenerRegistros = async (req, res) => {
    
    const registros = await Orders.findAll({})

    res.json({registros})
}

const obtenerRegistrosPorMes = async (req, res) => {

    const {mes} = req.params;

    
    // Imprime los parámetros para verificar
    console.log('Mes:', mes);

    const registros = await Orders.findAll({
        where: {
            [Sequelize.Op.and]: [
                {
                    fecha: {
                        [Sequelize.Op.and]: [
                            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('ShipDate')), mes)
                        ]
                    }
                }
            ]
        }
    });

    // Devuelve los registros encontrados
    res.json(registros);
    
}

export {
    obtenerRegistros,
    obtenerRegistrosPorMes
}