import { API_CONFIG } from "../config";

export const addCar = (
  model,
  color,
  year,
  price,
  company,
  driverTerrain,
  transmission,
  condition
) => {
  return fetch(API_CONFIG.baseUrl + "/cars", {
    method: "POST",
    headers: {
      "Context-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      color,
      year,
      price,
      company,
      driverTerrain,
      transmission,
      condition,
    }),
  });
};
