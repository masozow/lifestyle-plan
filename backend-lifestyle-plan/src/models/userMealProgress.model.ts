import {
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import sequelize from "../config/sequelize.js";
import { UserDailyMeal, OpenAIResponse } from "./index.js";

export interface UserMealProgressAttributes {
  id: number;
  userId: number;
  openAIResponseId: number;
  openAIResponse?: OpenAIResponse;
  date: string;
  language?: string;
  unitSystem?: string;
  portionUnit?: string;
  macroProteinUnit?: string;
  macroCarbsUnit?: string;
  macroFatUnit?: string;
  macroEnergyUnit?: string;
  dailyCalorieTarget?: number;
  ratioProtein?: number;
  ratioCarbs?: number;
  ratioFat?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMealProgressCreationAttributes
  extends Optional<
    UserMealProgressAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "openAIResponse"
    | "language"
    | "unitSystem"
    | "portionUnit"
    | "macroProteinUnit"
    | "macroCarbsUnit"
    | "macroFatUnit"
    | "macroEnergyUnit"
    | "dailyCalorieTarget"
    | "ratioProtein"
    | "ratioCarbs"
    | "ratioFat"
  > {}

class UserMealProgress extends Model<
  UserMealProgressAttributes,
  UserMealProgressCreationAttributes
> implements UserMealProgressAttributes {
  declare id: number;
  declare userId: number;
  declare openAIResponseId: number;
  declare date: string;
  declare openAIResponse?: OpenAIResponse;
  declare dailyMeals?: UserDailyMeal[];
  declare language?: string;
  declare unitSystem?: string;
  declare portionUnit?: string;
  declare macroProteinUnit?: string;
  declare macroCarbsUnit?: string;
  declare macroFatUnit?: string;
  declare macroEnergyUnit?: string;
  declare dailyCalorieTarget?: number;
  declare ratioProtein?: number;
  declare ratioCarbs?: number;
  declare ratioFat?: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UserMealProgress.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    openAIResponseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unitSystem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portionUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    macroProteinUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    macroCarbsUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    macroFatUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    macroEnergyUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dailyCalorieTarget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ratioProtein: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ratioCarbs: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ratioFat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "userMealProgress",
    timestamps: true,
    indexes: [
      {
        fields: ["userId", "date"],
        unique: true,
      },
    ],
  }
);

export default UserMealProgress;
