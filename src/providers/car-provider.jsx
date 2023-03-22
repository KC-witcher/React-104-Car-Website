import { createContext, useContext, useState, useEffect } from "react";
import { getCars } from "../api/cars/get-cars";

const CarsContext = createContext({});

export const CarsProvider = ({ children }) => {
  const [car, setCar] = useState([]);
  const [sort, setSort] = useState(false);
  const [carType, setCarType] = useState("All");

  const refetch = () => {
    getCars().then(setCar);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (sort) {
      getCars()
        .then((cars) =>
          cars.sort((carA, carB) => {
            if (carA.company > carB.company) return 1;
            if (carA.company < carB.company) return -1;
            if (carA.company === carB.company) return 0;
          })
        )
        .then(setCar);
    } else {
      refetch();
    }
  }, [sort]);

  useEffect(() => {
    if (carType == "All") {
      refetch();
    } else {
      getCars()
        .then((cars) =>
          cars.filter((car) => car.driveTerrain == carType.toLowerCase())
        )
        .then(setCar);
    }
  }, [carType]);

  return (
    <CarsContext.Provider
      value={{
        car,
        setCar,
        setSort,
        sort,
        carType,
        setCarType,
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
    sort: context.sort,
    setSort: context.setSort,
    carType: context.carType,
    setCarType: context.setCarType,
  };
};
