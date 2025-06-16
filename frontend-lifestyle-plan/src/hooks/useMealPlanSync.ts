import { useRef } from "react"
import { useMealPlanStore } from "@/store";
import { useApiRequest } from "./useApiRequest";

interface MealPlanSyncData {
  userId: number
  mealStatus: Record<string, any>
  lastUpdated: number
}

  /**
   * Hook to use when syncing meal plan changes to the server.
   *
   * @example
   * const { syncToServer, hasUnsyncedChanges } = useMealPlanSync(1, "/api/meal-plan");
   * const handleSyncButtonClick = () => {
   *   if (hasUnsyncedChanges) {
   *     syncToServer().then((success) => {
   *       if (success) {
   *         console.log("✅ Meal plan synced to server")
   *       } else {
   *         console.error("❌ Failed to sync meal plan")
   *       }
   *     })
   *   }
   * }
   *
   * @param {number | undefined} userId - ID of the user whose meal plan is being synced.
   * @param {string} apiEndpoint - URL of the API endpoint to send the request to.
   * @returns {Object} - Object with two properties: `syncToServer` (a function to call when syncing) and `hasUnsyncedChanges` (a boolean indicating whether there are unsynced changes).
   */
export const useMealPlanSync = (userId: number | undefined, apiEndpoint: string) => {
  const mealPlanRequest = useApiRequest<MealPlanSyncData>({
    url: apiEndpoint,
    method: "POST",
  });
  const { mealStatus, hasUnsyncedChanges, markAsSynced } = useMealPlanStore()
  const lastSyncRef = useRef<string>("")

  const syncToServer = async () => {
    if (!hasUnsyncedChanges() || !userId) return false

    try {
      const currentStateString = JSON.stringify(mealStatus)

      // Only sync if state has actually changed
      if (currentStateString === lastSyncRef.current) return false

      const syncData: MealPlanSyncData = {
        userId,
        mealStatus,
        lastUpdated: Date.now(),
      }

      console.log("Syncing to server:", syncData)

      // Replace this with your actual API call
      const response = await mealPlanRequest.mutateAsync({
          ...syncData,
          userId
        });

      if (response.isSuccess) {
        markAsSynced()
        lastSyncRef.current = currentStateString
        console.log("✅ Meal plan synced to server")
        return true
      } else {
        throw new Error(`HTTP error! Status: ${response.error.message}`)
      }
    } catch (error) {
      console.error("❌ Failed to sync meal plan:", error)
      return false
    }
  }

  return {
    syncToServer,
    hasUnsyncedChanges: hasUnsyncedChanges,
  }
}
