import { API_CONFIG } from "../config";

export const getAllFavorites = async () => {
  return await fetch(API_CONFIG.baseUrl + "/favorites").then((response) => {
    if (!response.ok) {
      throw new Error("Failed to Get Favorites");
    }
    return response.json();
  });
};

export const crateFavorite = async ({ userId, carId }) => {
  await fetch(API_CONFIG.baseUrl + "/favorites", {
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

export const deleteFavorite = async (id) => {
  await fetch(API_CONFIG.baseUrl + "/favorites/" + id, {
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
    return crateFavorite({ userId, carId });
  }

  return deleteFavorite(matchingFavorite.id);

  // delete matching favorite
};
