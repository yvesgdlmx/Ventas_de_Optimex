import { Sequelize, Op } from "sequelize";
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

const obtenerRegistrosPorSemana = async (req, res) => {
    const { ano, mes, semana } = req.params;

    console.log('Año:', ano);
    console.log('Mes:', mes);
    console.log('Semana:', semana);

    const anoInt = parseInt(ano, 10);
    const mesInt = parseInt(mes, 10);
    const semanaInt = parseInt(semana, 10);

    const primerDiaDelMes = new Date(anoInt, mesInt - 1, 1);
    let primerDiaSemana, ultimoDiaSemana;

    if (semanaInt === 5) {
        // Si es la quinta semana, calcular desde el día 29 hasta el último día del mes
        primerDiaSemana = new Date(anoInt, mesInt - 1, 29);
        ultimoDiaSemana = new Date(anoInt, mesInt, 0); // Último día del mes
    } else {
        primerDiaSemana = new Date(primerDiaDelMes.setDate((semanaInt - 1) * 7 + 1));
        ultimoDiaSemana = new Date(primerDiaSemana);
        ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);

        // Ajustar el último día si se pasa del mes
        if (ultimoDiaSemana.getMonth() + 1 !== mesInt) {
            ultimoDiaSemana.setMonth(mesInt - 1);
            ultimoDiaSemana.setDate(0); // Último día del mes anterior
        }
    }

    console.log('Primer día de la semana:', primerDiaSemana);
    console.log('Último día de la semana:', ultimoDiaSemana);

    try {
        const registros = await Orders.findAll({
            where: {
                ShipDate: {
                    [Op.between]: [primerDiaSemana, ultimoDiaSemana]
                }
            }
        });
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        res.status(500).json({ message: 'Error al obtener los registros' });
    }
};

const obtenerRegistrosPorRangoFechas = async (req, res) => {
    const { fechaInicio, fechaFin } = req.params;

    // Función para convertir una fecha en formato YYYY-MM-DD a un objeto Date
    const convertirFechaInicio = (fechaStr) => {
        const [year, month, day] = fechaStr.split('-');
        return new Date(year, month - 1, day, 0, 0, 0); // Comienzo del día
    };

    const convertirFechaFin = (fechaStr) => {
        const [year, month, day] = fechaStr.split('-');
        return new Date(year, month - 1, day, 23, 59, 59); // Final del día
    };

    const fechaInicioDate = convertirFechaInicio(fechaInicio);
    const fechaFinDate = convertirFechaFin(fechaFin);

    console.log('Fecha de inicio:', fechaInicioDate);
    console.log('Fecha de fin:', fechaFinDate);

    try {
        const registros = await Orders.findAll({
            where: {
                ShipDate: {
                    [Op.between]: [fechaInicioDate, fechaFinDate]
                }
            }
        });
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        res.status(500).json({ message: 'Error al obtener los registros' });
    }
};

export {
    obtenerRegistros,
    obtenerRegistrosPorMes,
    obtenerRegistrosPorSemana,
    obtenerRegistrosPorRangoFechas
}