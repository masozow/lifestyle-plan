import User from "./user.model.js";
import Profile from "./profile.model.js";
import Plan from "./plan.model.js";

// Relations
User.hasMany(Profile, { foreignKey: "userId", as: "profiles" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Plan, { foreignKey: "userId", as: "plans" });
Plan.belongsTo(User, { foreignKey: "userId", as: "user" });

export {
  User,
  Profile,
  Plan,
};
