import { API_CONFIG } from "../config";

export const registerUser = ({ username, password }) => {
  return fetch(API_CONFIG.baseUrl + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to Register ${username}`);
    }
    return response.json();
  });
};
