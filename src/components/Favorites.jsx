import React, { useState } from "react";
import { Nav } from "./Nav";
import { useCar } from "../providers/car-provider";
import { useAuthContext } from "../providers/auth-provider";
import { useFavorites } from "../providers/fav-provider";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  CardContent,
  Collapse,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./App.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
      {/* <div
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
      </div> */}
      <Grid container rowSpacing={20} className="grid-layout">
        {favoriteCars.map((favorite) => {
          const [expanded, setExpanded] = useState(false);

          const handleExpandClick = () => {
            setExpanded(!expanded);
          };

          return (
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title={`${favorite.company} ${favorite.model}`}
                  subheader={favorite.year}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={favorite.image}
                  alt={favorite.model}
                />
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      This {favorite.condition} {favorite.color} {favorite.year}{" "}
                      {favorite.company} {favorite.model} is on sale for $
                      {favorite.price}!! It is {favorite.driveTerrain} vehicle
                      with {favorite.transmission} transmission
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
