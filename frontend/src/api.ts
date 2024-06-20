// frontend/src/api.ts
export const fetchBackendMessage = async (): Promise<string> => {
  const response = await fetch("/api");
  const data = await response.text();
  return data;
};
