import { createContext, useContext, useState, useEffect } from "react";
import { getCars } from "../api/cars/get-cars";
import { addCar } from "../api/cars/create-car";

const CarsContext = createContext({});

export const CarsProvider = ({ children }) => {
  const [car, setCar] = useState([]);

  const refetch = () => {
    getCars().then(setCar);
  };

  useEffect(() => {
    refetch();
  }, []);

  const createCar = ({
    model,
    color,
    year,
    price,
    company,
    driverTerrain,
    transmission,
    condition,
  }) => {
    return addCar(
      model,
      color,
      year,
      price,
      company,
      driverTerrain,
      transmission,
      condition
    ).then((response) => {
      if (!response.ok) {
        alter("Something Failed!");
        return;
      }
      refetch();
    });
  };

  return (
    <CarsContext.Provider
      value={{
        car,
        setCar,
        createCar,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarsContext);
  return {
    cars: context.car,
    setCar: context.setCar,
    createCar: context.createCar,
  };
};
