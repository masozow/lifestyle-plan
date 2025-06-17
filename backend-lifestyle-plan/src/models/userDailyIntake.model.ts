import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/sequelize.js";

export interface UserDailyIntakeAttributes {
  id: number;
  userDailyMealId: number;
  consumedFood: string;
  consumedPortion: number;
  consumedProtein: number;
  consumedFat: number;
  consumedCarbs: number;
  consumedEnergy: number;
  consumed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDailyIntakeCreationAttributes
  extends Optional<UserDailyIntakeAttributes, "id" | "createdAt" | "updatedAt"> {}

class UserDailyIntake extends Model<
  UserDailyIntakeAttributes,
  UserDailyIntakeCreationAttributes
> implements UserDailyIntakeAttributes {
  declare id: number;
  declare userDailyMealId: number;
  declare consumedFood: string;
  declare consumedPortion: number;
  declare consumedProtein: number;
  declare consumedFat: number;
  declare consumedCarbs: number;
  declare consumedEnergy: number;
  declare consumed: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UserDailyIntake.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userDailyMealId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    consumedFood: { type: DataTypes.STRING, allowNull: false },
    consumedPortion: { type: DataTypes.FLOAT, allowNull: false },
    consumedProtein: { type: DataTypes.FLOAT, allowNull: false },
    consumedFat: { type: DataTypes.FLOAT, allowNull: false },
    consumedCarbs: { type: DataTypes.FLOAT, allowNull: false },
    consumedEnergy: { type: DataTypes.FLOAT, allowNull: false },
    consumed: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    tableName: "userDailyIntake",
    timestamps: true,
  }
);

export default UserDailyIntake;
