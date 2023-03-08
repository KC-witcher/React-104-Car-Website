/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { useState, useEffect, createContext, useContext } from "react";
import {
  getAllFavorites,
  toggleFavoriteAPI,
} from "../api/favorite/create-favorite";

const Favorites = createContext({});

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const refetch = () => {
    getAllFavorites().then(setFavorites);
  };

  useEffect(() => {
    refetch();
  }, []);

  const toggleFavorite = ({ userId, carId }) => {
    return toggleFavoriteAPI({ userId, carId }).then(() => refetch());
  };

  return (
    <Favorites.Provider
      value={{
        favorites,
        setFavorites,
        toggleFavorite,
      }}
    >
      {" "}
      {children}{" "}
    </Favorites.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(Favorites);
  return {
    favorites: context.favorites,
    setFavorites: context.setFavorites,
    toggleFavorite: context.toggleFavorite,
  };
};
