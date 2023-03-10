import * as _ from "lodash-es";
import { writeFileSync } from "fs";
const capitalize = _.capitalize;
const range = _.range;
const sample = _.sample;

const carAmount = 10;
const image = [
  "/src/assets/2016JaguarF-Type.webp",
  "/src/assets/2019DodgeChallenger.webp",
  "src/assets/2022CadillacCT4.webp",
  "src/assets/2022FordBronco.webp",
  "src/assets/2022FordMustang.webp",
  "src/assets/2022KiaStinger.webp",
  "src/assets/2022ToyotaGR86.webp",
];

const db = {
  favorites: [],
  users: [],
  cars: [
    {
      model: "F-Type",
      color: "red",
      year: 2016,
      price: 50000,
      company: "Jaguar",
      driveTerrain: "rwd",
      transmission: "automatic",
      condition: "used",
      image: image[0],
      id: 1,
    },
    {
      model: "Challenger",
      color: "grey",
      year: 2019,
      price: 30000,
      company: "Dodge",
      driveTerrain: "rwd",
      transmission: "manual",
      condition: "used",
      image: image[1],
      id: 2,
    },
    {
      model: "CT4",
      color: "white",
      year: 2022,
      price: 45000,
      company: "Cadillac",
      driveTerrain: "rwd",
      transmission: "manual",
      condition: "used",
      image: image[2],
      id: 3,
    },
    {
      model: "Bronco",
      color: "grey",
      year: 2022,
      price: 35000,
      company: "Ford",
      driveTerrain: "awd",
      transmission: "automatic",
      condition: "new",
      image: image[3],
      id: 4,
    },
    {
      model: "Mustang",
      color: "green",
      year: 2022,
      price: 45000,
      company: "Ford",
      driveTerrain: "rwd",
      transmission: "manual",
      condition: "used",
      image: image[4],
      id: 5,
    },
    {
      model: "Stinger",
      color: "black",
      year: 2022,
      price: 50000,
      company: "Kia",
      driveTerrain: "awd",
      transmission: "automatic",
      condition: "new",
      image: image[5],
      id: 6,
    },
    {
      model: "GR86",
      color: "blue",
      year: 2022,
      price: 30000,
      company: "Toyota",
      driveTerrain: "fwd",
      transmission: "manual",
      condition: "used",
      image: image[6],
      id: 7,
    },
  ],
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
