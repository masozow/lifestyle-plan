import { DataTypes, Model, Optional, HasOneGetAssociationMixin } from "sequelize";
import sequelize from "../config/sequelize.js";
import Profile from "./profile.model.js";

export interface UserAttributes {
  id: number;
  email: string;
  name: string;
  password: string;
  phone: string;
  birthDate: Date;
  statusId: number;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare email: string;
  declare name: string;
  declare password: string;
  declare phone: string;
  declare birthDate: Date;
  declare statusId: number;
  declare roleId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getProfile: HasOneGetAssociationMixin<Profile>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user",
    timestamps: true,
  }
);

export default User;
