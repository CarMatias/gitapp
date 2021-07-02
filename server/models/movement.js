const Sequelize = require('sequelize');

const db = require('../db.js');

const MovementType = require('./movementType.js');

/**
 * Modelo de movimiento.
 *
 *
 */
const Movement = db.define(
    'Movement',
    {
        // Atributos
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        amount: {
            type: Sequelize.NUMBER,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            values: MovementType.types,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        recurrent:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },

    },
    { tableName: 'Movement' }
);

/**
 * Obtener todos los movimientos de la base de datos.
 *
 */
const getAllMovements = (limit, skip, type) => {
    let where = {};

    if (type) {
        where = {
            ...where,
            type: type,
        };
    }

    return Movement.findAndCountAll({
        limit: limit,
        offset: skip,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        where: where,
        order: [
            ['id', 'DESC'],
        ],
    });
};

/**
 * Crear un movimiento nuevo.
 * Parámetro data: JSON con los atributos a crear.
 *
 */
const createMovement = ({
    date = '01/01/2021',
    amount = 0.0,
    type = MovementType.EXPENSE,
    category = '',
    description = '',
    recurrent = false,
} = {}) => {

    //debo cambiar el formato de fecha para que no rompa el fixtures
    date=date.split("/")!=-1?(
        //viene del fixture y tengo que cambiarlo
        `${date.split("/")[2]}-${date.split("/")[1]}-${date.split("/")[0]}`
    ):(
        date
    )

    return Movement.create({ description,date, amount, type, category, recurrent});
};

/**
 * Modifica un movimiento ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro data: JSON con los atributos a crear.
 *
 */
const updateMovement = (
    id,
    {
        description = '',
        date = '01/01/2021',
        amount = 0.0,
        type = MovementType.EXPENSE,
        category = '',
        recurrent = false,

    } = {}
) => {
    return Movement.findOne({ where: { id: id } }).then((movement) => {
        if (movement != null) {
            return movement.update({description, date, amount, type, category, recurrent  });
        }
        return null;
    });
};

/**
 * Elimina un movimiento existente.
 * Parámetro id: id a buscar en la base de datos.
 *
 */
const deleteMovement = (id) => {
    return Movement.findOne({ where: { id: id } }).then((movement) => {
        if (movement != null) {
            return movement.destroy();
        }
        return null;
    });
};

const MovementModel = {
    Movement: Movement,
    getAll: getAllMovements,
    create: createMovement,
    update: updateMovement,
    delete: deleteMovement,
};

module.exports = MovementModel;
