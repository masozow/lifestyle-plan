// src/models/plan.model.ts
import {
  DataTypes,
  Model,
  Optional,
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./user.model.js";

export interface PlanAttributes {
  id: number;
  objective: string;
  restriction?: string;
  preference?: string;
  extras?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlanCreationAttributes
  extends Optional<PlanAttributes, "id" | "restriction" | "preference" | "extras" | "createdAt" | "updatedAt"> {}

class Plan extends Model<PlanAttributes, PlanCreationAttributes>
  implements PlanAttributes {
  declare id: number;
  declare objective: string;
  declare restriction?: string;
  declare preference?: string;
  declare extras?: string;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getUser: BelongsToGetAssociationMixin<User>;
}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    objective: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restriction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extras: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "plan",
    timestamps: true,
  }
);

export default Plan;
