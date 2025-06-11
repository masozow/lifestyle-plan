import User from "./user.model.js";
import Profile from "./profile.model.js";
import Plan from "./plan.model.js";
import UserPrompt from "./userPrompt.model.js";
import OpenAIResponse from "./openAIResponse.model.js";

// Relations
User.hasMany(Profile, { foreignKey: "userId", as: "profiles" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Plan, { foreignKey: "userId", as: "plans" });
Plan.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(UserPrompt, { foreignKey: "userId", as: "userPrompts" });
UserPrompt.belongsTo(User, { foreignKey: "userId", as: "user" });

UserPrompt.hasMany(OpenAIResponse, { foreignKey: "userPromptId", as: "openaiResponses" });
OpenAIResponse.belongsTo(UserPrompt, { foreignKey: "userPromptId", as: "userPrompt" });

export {
  User,
  Profile,
  Plan,
  UserPrompt,
  OpenAIResponse
};
