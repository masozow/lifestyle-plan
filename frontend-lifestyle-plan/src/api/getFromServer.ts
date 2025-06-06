export const getFromServer = async (url: string): Promise<any> => {
    const method = "GET";
    const response = await fetch(url, {
    method: method,
     headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
  });

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error?.message || response.statusText;
    const errorToThrow = new Error(errorMessage);
    if (import.meta.env.ENVIRONMENT === "development") {
      console.error("Error saving data to server:", errorToThrow);
    }
    throw errorToThrow;
  }
  return response.json();
};

