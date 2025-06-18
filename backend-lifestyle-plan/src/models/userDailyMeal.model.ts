import {
  DataTypes,
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  HasOneGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/sequelize.js";
import UserMealProgress from "./userMealProgress.model.js";
import UserDailyIntake from "./userDailyIntake.model.js";

export interface UserDailyMealAttributes {
  id: number;
  day: string;
  meal: string;
  date?: Date; 
  userMealProgressId: number;
  recommendedMeal: string;
  targetPortion: number;
  targetProtein: number;
  targetFat: number;
  targetCarbs: number;
  targetEnergy: number;
  consumed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDailyMealCreationAttributes
  extends Optional<UserDailyMealAttributes, "id" | "createdAt" | "updatedAt" | "date"> {}

class UserDailyMeal extends Model<
  UserDailyMealAttributes,
  UserDailyMealCreationAttributes
> implements UserDailyMealAttributes {
  declare id: number;
  declare day: string;
  declare date: Date;
  declare meal: string;
  declare userMealProgressId: number;
  declare recommendedMeal: string;
  declare targetPortion: number;
  declare targetProtein: number;
  declare targetFat: number;
  declare targetCarbs: number;
  declare targetEnergy: number;
  declare consumed: boolean;
  declare intake?: UserDailyIntake;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getUserMealProgress: BelongsToGetAssociationMixin<UserMealProgress>;
  declare getUserDailyIntake: HasOneGetAssociationMixin<UserDailyIntake>;
}

UserDailyMeal.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    meal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userMealProgressId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    recommendedMeal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetPortion: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    targetProtein: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    targetFat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    targetCarbs: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    targetEnergy: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    consumed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "userDailyMeal",
    timestamps: true,
  }
);

export default UserDailyMeal;
