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
        date: {
            type: Sequelize.DATE,
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
    },
    { tableName: 'Movement' }
);

/**
 * Obtener todos los movimientos de la base de datos.
 *
 */
const getAllMovements = (limit, skip) => {
    return Movement.findAndCountAll({
        limit: limit,
        offset: skip,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
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
} = {}) => {
    date = new Date()
    return Movement.create({ date, amount, type, category });
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
    delete: deleteMovement,
};

module.exports = MovementModel;
