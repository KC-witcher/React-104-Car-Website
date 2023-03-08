import { API_CONFIG } from "../config";

export const getAllFavorites = () => {
  return fetch(API_CONFIG.baseUrl + "/favorites").then((response) => {
    if (!response.ok) {
      throw new Error("Failed to Get Favorites");
    }
    return response.json();
  });
};

export const crateFavorite = ({ userId, carId }) => {
  fetch(API_CONFIG.baseUrl + "/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, carId }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to Create Favorite");
    }
    return response.json();
  });
};

export const deleteFavorite = (id) => {
  fetch(API_CONFIG.baseUrl + "/favorites/" + id, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to Delete Favorite" + id);
    }
    return response.json();
  });
};

export const toggleFavoriteAPI = async ({ userId, carId }) => {
  const allFavorites = await getAllFavorites();
  const matchingFavorite = allFavorites.find(
    (favorite) => favorite.userId === userId && favorite.carId === carId
  );
  if (!matchingFavorite) {
    // createone
    return await crateFavorite({ userId, carId });
  }

  return await deleteFavorite(matchingFavorite.id);

  // delete matching favorite
};
