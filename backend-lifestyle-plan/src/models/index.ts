import User from "./user.model.js";
import Profile from "./profile.model.js";

User.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Profile };
