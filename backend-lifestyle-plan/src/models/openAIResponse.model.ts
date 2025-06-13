import {
  DataTypes,
  Model,
  Optional,
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/sequelize.js";
import UserPrompt from "./userPrompt.model.js";

export interface OpenAIResponseAttributes {
  id: number;
  userPromptId: number;
  userId: number;
  response: object;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OpenAIResponseCreationAttributes
  extends Optional<OpenAIResponseAttributes, "id" | "createdAt" | "updatedAt"> {}

class OpenAIResponse
  extends Model<OpenAIResponseAttributes, OpenAIResponseCreationAttributes>
  implements OpenAIResponseAttributes
{
  declare id: number;
  declare userPromptId: number;
  declare userId: number;
  declare response: object;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getUserPrompt: BelongsToGetAssociationMixin<UserPrompt>;
}

OpenAIResponse.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userPromptId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    response: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "openai_response",
    timestamps: true,
  }
);

export default OpenAIResponse;
