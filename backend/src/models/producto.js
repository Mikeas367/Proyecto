import {DataTypes} from 'sequelize'

import {sequelize} from '../database/database.js'

export const Producto = sequelize.define('productos',{

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    precio_unitario:{
        type: DataTypes.FLOAT
    },

    precio_compra:{
        type: DataTypes.FLOAT
    },

    descripcion:{
        type: DataTypes.STRING
    },

    stock:{
        type: DataTypes.INTEGER
    }
},
{
    timestamps:false
}
)