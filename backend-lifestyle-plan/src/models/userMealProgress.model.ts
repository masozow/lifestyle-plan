import {
  DataTypes,
  Model,
  Optional,
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./user.model.js";
import OpenAIResponse from "./openAIResponse.model.js";

export interface UserMealProgressAttributes {
  id: number;
  userId: number;
  openAIResponseId: number;
  date: string; // YYYY-MM-DD
  meal: string;
  foodConsumed: string;
  fulfilled: boolean;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMealProgressCreationAttributes
  extends Optional<UserMealProgressAttributes, "id" | "notes" | "createdAt" | "updatedAt"> {}

class UserMealProgress extends Model<
  UserMealProgressAttributes,
  UserMealProgressCreationAttributes
> implements UserMealProgressAttributes {
  declare id: number;
  declare userId: number;
  declare openAIResponseId: number;
  declare date: string;
  declare meal: string;
  declare foodConsumed: string;
  declare fulfilled: boolean;
  declare notes?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare getOpenAIResponse: BelongsToGetAssociationMixin<OpenAIResponse>;
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    meal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodConsumed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fulfilled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "userMealProgress",
    timestamps: true,
  }
);

export default UserMealProgress;
