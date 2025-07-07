USE nutrition;        
DELIMITER $$
CREATE PROCEDURE sp_getUserProgressData(IN inputUserId INT)
BEGIN
  SELECT
    T.date,
    T.targetEnergy,
    COALESCE(C.consumedEnergy, 0) AS consumedEnergy,
    T.targetProtein,
    COALESCE(C.consumedProtein, 0) AS consumedProtein,
    T.targetCarbs,
    COALESCE(C.consumedCarbs, 0) AS consumedCarbs,
    T.targetFat,
    COALESCE(C.consumedFat, 0) AS consumedFat
  FROM (
    SELECT
      M.date,
      SUM(M.targetEnergy) AS targetEnergy,
      SUM(M.targetProtein) AS targetProtein,
      SUM(M.targetCarbs) AS targetCarbs,
      SUM(M.targetFat) AS targetFat
    FROM nutrition.userDailyMeal AS M
    JOIN nutrition.userMealProgress AS U
      ON M.userMealProgressId = U.id
    JOIN (
      SELECT 
        M2.date,
        MAX(M2.userMealProgressId) AS MaxProgressId
      FROM nutrition.userDailyMeal AS M2
      JOIN nutrition.userMealProgress AS U2
        ON M2.userMealProgressId = U2.id
      WHERE U2.userId = inputUserId
      GROUP BY M2.date
    ) AS latest
      ON M.date = latest.date
      AND M.userMealProgressId = latest.MaxProgressId
    WHERE U.userId = inputUserId
    GROUP BY M.date
  ) AS T
  LEFT JOIN (
    SELECT
      M.date,
      SUM(COALESCE(I.consumedEnergy, M.targetEnergy)) AS consumedEnergy,
      SUM(COALESCE(I.consumedProtein, M.targetProtein)) AS consumedProtein,
      SUM(COALESCE(I.consumedCarbs, M.targetCarbs)) AS consumedCarbs,
      SUM(COALESCE(I.consumedFat, M.targetFat)) AS consumedFat
    FROM nutrition.userDailyMeal AS M
    JOIN nutrition.userMealProgress AS U
      ON M.userMealProgressId = U.id
    LEFT JOIN nutrition.userDailyIntake AS I
      ON I.userDailyMealId = M.id
    WHERE U.userId = inputUserId
      AND (I.consumed = 1 OR M.consumed = 1)
    GROUP BY M.date
  ) AS C
  ON T.date = C.date
  ORDER BY T.date;
END $$

DELIMITER ;