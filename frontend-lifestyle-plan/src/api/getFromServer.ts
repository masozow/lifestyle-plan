export const getFromServer = async <T >(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || response.statusText);
  }

  return response.json();
};
