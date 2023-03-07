import { API_CONFIG } from "../config";

export const getCars = () => {
  return fetch(API_CONFIG.baseUrl + "/cars").then((response) =>
    response.json()
  );
};
