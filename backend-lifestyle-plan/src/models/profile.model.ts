import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/sequelize.js";

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
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id" | "createdAt" | "updatedAt" | "hip"> {}

class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
  public id!: number;
  public unitSystem!: "metric" | "imperial";
  public gender!: "male" | "female";
  public weight!: number;
  public height!: number;
  public age!: number;
  public waist!: number;
  public neck!: number;
  public hip?: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init({
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
}, {
  sequelize,
  tableName: "profile",
  timestamps: true,
});

export default Profile;
