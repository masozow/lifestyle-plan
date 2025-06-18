import User from "./user.model.js";
import Profile from "./profile.model.js";
import Plan from "./plan.model.js";
import UserPrompt from "./userPrompt.model.js";
import OpenAIResponse from "./openAIResponse.model.js";
import UserMealProgress from "./userMealProgress.model.js";
import UserDailyMeal from "./userDailyMeal.model.js";
import UserDailyIntake from "./userDailyIntake.model.js";


// Relations
User.hasMany(Profile, { foreignKey: "userId", as: "profiles" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Plan, { foreignKey: "userId", as: "plans" });
Plan.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(UserPrompt, { foreignKey: "userId", as: "userPrompts" });
UserPrompt.belongsTo(User, { foreignKey: "userId", as: "user" });

UserPrompt.hasMany(OpenAIResponse, { foreignKey: "userPromptId", as: "openaiResponses" });
OpenAIResponse.belongsTo(UserPrompt, { foreignKey: "userPromptId", as: "userPrompt" });

User.hasMany(UserMealProgress, { foreignKey: "userId", as: "mealProgress" });
UserMealProgress.belongsTo(User, { foreignKey: "userId", as: "user" });

OpenAIResponse.hasMany(UserMealProgress, {
  foreignKey: "openAIResponseId",
  as: "mealProgress",
});

UserMealProgress.belongsTo(OpenAIResponse, {
  foreignKey: "openAIResponseId",
  as: "openAIResponse",
});
User.hasMany(OpenAIResponse, {
  foreignKey: "userId",
  as: "openaiResponses",
});

OpenAIResponse.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
UserMealProgress.hasMany(UserDailyMeal, {
  foreignKey: "userMealProgressId",
  as: "dailyMeals",
});
UserDailyMeal.belongsTo(UserMealProgress, {
  foreignKey: "userMealProgressId",
  as: "mealProgress",
});

UserDailyMeal.hasOne(UserDailyIntake, {
  foreignKey: "userDailyMealId",
  as: "intake",
});
UserDailyIntake.belongsTo(UserDailyMeal, {
  foreignKey: "userDailyMealId",
  as: "dailyMeal",
});
export {
  User,
  Profile,
  Plan,
  UserPrompt,
  OpenAIResponse,
  UserMealProgress,
  UserDailyMeal,
  UserDailyIntake
};
