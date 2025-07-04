const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const API_ENDPOINTS = {
  profile: `${BASE_URL}/api/profile`,
  login: `${BASE_URL}/api/login`,
  logout: `${BASE_URL}/api/logout`,
  user: `${BASE_URL}/api/user`,
  session: `${BASE_URL}/api/session`,
  plan: `${BASE_URL}/api/plan`,
  openai: `${BASE_URL}/api/openai`,
  openaiResponse: `${BASE_URL}/api/openai-response`,
  userMealProgress: `${BASE_URL}/api/user-meal-progress`,
  userMealPlan: `${BASE_URL}/api/user-meal-plan`,
  userDailyIntake: `${BASE_URL}/api/user-daily/intake`,
  userDailyConsumed: `${BASE_URL}/api/user-daily/consumed`,
  //charts
  progressChart: `${BASE_URL}/api/progress-chart`
} as const;

// Tipado automático
export type EndpointKey = keyof typeof API_ENDPOINTS;
