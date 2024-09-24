import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Venta = sequelize.define('Venta', {
    id:{
        primaryKey:true, 
        type: DataTypes.INTEGER, 
        autoIncrement:true,
    },
    fecha:{
        type:DataTypes.DATE
    }
})