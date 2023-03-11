import React, { useState } from "react";
import { Nav } from "./Nav";
import { useCar } from "../providers/car-provider";
import { useAuthContext } from "../providers/auth-provider";
import { useFavorites } from "../providers/fav-provider";

export const Favorite = () => {
  const { cars } = useCar();
  const { user } = useAuthContext();
  const { favorites } = useFavorites();
  let favoriteCars = [];

  const filterFavorite = favorites.filter(
    (favorite) => favorite.userId == user.id
  );
  filterFavorite.forEach((favorite) => {
    cars.forEach((car) => {
      if (favorite.carId == car.id) {
        favoriteCars.push(car);
      }
    });
  });

  return (
    <div>
      <Nav />
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          width: 1000,
          border: "3px solid white",
          padding: 40,
        }}
      >
        {favoriteCars.map(
          ({
            id,
            company,
            model,
            year,
            color,
            price,
            driveTerrain,
            transmission,
            condition,
            image,
          }) => {
            return (
              <div
                key={id}
                style={{ width: 100, height: 200, border: "1px solid white" }}
              >
                <h3>{company}</h3>
                <h4>{model}</h4>
                <p>{year}</p>
                <p>{color}</p>
                <p>$ {price}</p>
                <p>{driveTerrain}</p>
                <p>{transmission}</p>
                <p>{condition}</p>
                <img src={image} width="100" alt="" />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
