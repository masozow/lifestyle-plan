import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/sequelize.js";
import { UserDailyMeal,OpenAIResponse } from "./index.js";

export interface UserMealProgressAttributes {
  id: number;
  userId: number;
  openAIResponseId: number;
  openAIResponse?: OpenAIResponse;
  date: string; // YYYY-MM-DD (stored as DATEONLY)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMealProgressCreationAttributes
  extends Optional<UserMealProgressAttributes, "id" | "createdAt" | "updatedAt" | "openAIResponse"> {}

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
