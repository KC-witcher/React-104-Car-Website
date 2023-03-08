import React from "react";
import { useAuthContext } from "../providers/auth-provider";
import { useCar } from "../providers/car-provider";
import { useFavorites } from "../providers/fav-provider";
import { Nav } from "./Nav";

export const Home = () => {
  const { user } = useAuthContext();
  const { cars } = useCar();
  const { favorites, toggleFavorite } = useFavorites();
  console.log(cars);
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
        {cars.map((car) => {
          const isFavorite = favorites.find(
            (favorite) =>
              favorite.userId === user?.id && favorite.carId === car?.id
          );

          return (
            <div
              key={car.id}
              style={{ width: 100, height: 200, border: "1px solid white" }}
            >
              <h3>{car.company}</h3>
              <h4>{car.model}</h4>
              <p>{car.year}</p>
              <p>{car.color}</p>
              <p>$ {car.price}</p>
              <p>{car.driveTerrain}</p>
              <p>{car.transmission}</p>
              <p>{car.condition}</p>
              <div
                onClick={() => {
                  toggleFavorite({ carId: car.id, userId: user.id });
                }}
              >
                {isFavorite && <button>{"<3"}</button>}
                {!isFavorite && <button>O</button>}
              </div>
              <img src={car.image} width="100" alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
