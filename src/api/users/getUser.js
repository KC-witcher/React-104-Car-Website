import { API_CONFIG } from "../config";
export const getUser = ({ username }) => {
  return fetch(API_CONFIG.baseUrl + "/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could Not Get The User With Username: ${username}`);
      }
      return response.json();
    })
    .then((users) => users.find((user) => user.username == username))
    .then((user) => {
      if (!user) {
        throw new Error("User Not Found");
      }
      return user;
    });
};
