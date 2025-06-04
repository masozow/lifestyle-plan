import {
  DataTypes,
  Model,
  Optional,
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./user.model.js";

export interface ProfileAttributes {
  id: number;
  unitSystem: "metric" | "imperial";
  gender: "male" | "female";
  weight: number;
  height: number;
  age: number;
  waist: number;
  neck: number;
  hip?: number | null;
  language: string;
  objective: string;
  restriction?: string;
  preference?: string;
  extras?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileCreationAttributes
  extends Optional<
    ProfileAttributes,
    "id" | "hip" | "restriction" | "preference" | "extras" | "createdAt" | "updatedAt"
  > {}

class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  declare id: number;
  declare unitSystem: "metric" | "imperial";
  declare gender: "male" | "female";
  declare weight: number;
  declare height: number;
  declare age: number;
  declare waist: number;
  declare neck: number;
  declare hip?: number | null;
  declare language: string;
  declare objective: string;
  declare restriction?: string;
  declare preference?: string;
  declare extras?: string;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getUser: BelongsToGetAssociationMixin<User>;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    unitSystem: {
      type: DataTypes.ENUM("metric", "imperial"),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
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
    language: {
      type: DataTypes.STRING,
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
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "profile",
    timestamps: true,
  }
);

export default Profile;
