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
  weight: number;
  height: number;
  age: number;
  waist: number;
  neck: number;
  hip?: number | null;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id" | "hip" | "createdAt" | "updatedAt"> {}

class Profile extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes {
  declare id: number;
  declare unitSystem: "metric" | "imperial";
  declare weight: number;
  declare height: number;
  declare age: number;
  declare waist: number;
  declare neck: number;
  declare hip?: number | null;
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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "profile",
    timestamps: true,
  }
);

export default Profile;
