import {
  DataTypes,
  Model,
  Optional,
  HasManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "../config/sequelize.js";

export interface UserAttributes {
  id: number;
  email: string;
  name: string;
  password: string;
  phone: string;
  birthDate: Date;
  gender: "male" | "female";
  statusId: number;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  declare id: number;
  declare email: string;
  declare name: string;
  declare password: string;
  declare phone: string;
  declare birthDate: Date;
  declare gender: "male" | "female";
  declare statusId: number;
  declare roleId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getProfiles: HasManyGetAssociationsMixin<any>;
  declare getPlans: HasManyGetAssociationsMixin<any>;
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
    gender: {
      type: DataTypes.ENUM("male", "female"),
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
