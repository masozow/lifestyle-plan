import { motion } from "motion/react";
import { ObjectivesCard } from "./my-components/visualizers/ObjectivesCard";
import { ProfileCard } from "./my-components/visualizers/ProfileCard";
import { UserCard } from "./my-components/visualizers/UserCard";

export function SectionCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="*:data-[slot=card]:from-primary/4 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3"
    >
      <ObjectivesCard className="@container/card" />
      <ProfileCard className="@container/card" />
      <UserCard className="@container/card" />
    </motion.div>
  );
}
