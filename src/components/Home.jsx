import React, { useState } from "react";
import { useAuthContext } from "../providers/auth-provider";
import { useCar } from "../providers/car-provider";
import { useFavorites } from "../providers/fav-provider";
import { Nav } from "./Nav";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorder } from "@mui/icons-material";
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

export const Home = () => {
  const { user } = useAuthContext();
  const { cars } = useCar();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div>
      <Nav />
      <Grid container rowSpacing={20} className="grid-layout">
        {cars.map((car) => {
          const isFavorite = favorites.find(
            (favorite) =>
              favorite.userId == user?.id && favorite.carId == car?.id
          );
          const [expanded, setExpanded] = useState(false);

          const handleExpandClick = () => {
            setExpanded(!expanded);
          };

          return (
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title={`${car.company} ${car.model}`}
                  subheader={car.year}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={car.image}
                  alt={car.model}
                />
                <CardActions disableSpacing>
                  <div
                    onClick={() =>
                      toggleFavorite({ carId: car.id, userId: user.id })
                    }
                  >
                    {isFavorite && (
                      <IconButton>
                        <FavoriteIcon />
                      </IconButton>
                    )}
                    {!isFavorite && (
                      <IconButton>
                        <FavoriteBorder />
                      </IconButton>
                    )}
                  </div>
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
                      This {car.condition} {car.color} {car.year} {car.company}{" "}
                      {car.model} is on sale for ${car.price}!! It is{" "}
                      {car.driveTerrain} vehicle with {car.transmission}{" "}
                      transmission
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
