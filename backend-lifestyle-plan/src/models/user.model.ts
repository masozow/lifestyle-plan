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

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public password!: string;
  public phone!: string;
  public birthDate!: Date;
  public statusId!: number;
  public roleId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProfile!: HasOneGetAssociationMixin<Profile>;
}

User.init({
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
}, {
  sequelize,
  tableName: "user",
  timestamps: true,
});

User.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

export default User;
