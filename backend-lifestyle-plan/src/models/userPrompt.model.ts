import {
  DataTypes,
  Model,
  Optional,
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./user.model.js";

export interface UserPromptAttributes {
  id: number;
  language: string;
  unitSystem: "metric" | "imperial";
  weight: number;
  height: number;
  age: number;
  waist: number;
  neck: number;
  hip?: number | null;
  gender: "male" | "female";
  objective: string;
  restriction?: string;
  preference?: string;
  extras?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPromptCreationAttributes
  extends Optional<UserPromptAttributes, "id" | "hip" | "restriction" | "preference" | "extras" | "createdAt" | "updatedAt"> {}

class UserPrompt extends Model<UserPromptAttributes, UserPromptCreationAttributes>
  implements UserPromptAttributes {
  declare id: number;
  declare language: string;
  declare unitSystem: "metric" | "imperial";
  declare weight: number;
  declare height: number;
  declare age: number;
  declare waist: number;
  declare neck: number;
  declare hip?: number | null;
  declare gender: "male" | "female";
  declare objective: string;
  declare restriction?: string;
  declare preference?: string;
  declare extras?: string;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getUser: BelongsToGetAssociationMixin<User>;
}

UserPrompt.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitSystem: {
      type: DataTypes.ENUM("metric", "imperial"),
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    waist: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    neck: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    hip: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
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
    tableName: "user_prompt",
    timestamps: true,
  }
);

export default UserPrompt;
