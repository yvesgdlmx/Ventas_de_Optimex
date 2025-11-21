import { Sequelize, Op} from 'sequelize';
import ConsumoMaterial from '../models/ConsumoMaterial.js'

const obtenerRegistrosPorMesYAno = async (req, res) => {
    const { mes, ano} = req.params;

    console.log('Mes:', mes);
    console.log('Año:', ano);

    try {
        // Primero obtén todos los registros para verificar que existen
        const todosLosRegistros = await ConsumoMaterial.findAll();
        console.log('Total de registros en la tabla:', todosLosRegistros.length);
        
        if (todosLosRegistros.length > 0) {
            console.log('Primer registro de ejemplo:', todosLosRegistros[0].toJSON());
        }

        const registros = await ConsumoMaterial.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('Fecha')), parseInt(mes)),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Fecha')), parseInt(ano))
                ]
            }
        });
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener los registros: ', error);
        res.status(500).json({ message: 'Error al obtener los registros'});
    }
}

export {
    obtenerRegistrosPorMesYAno
}