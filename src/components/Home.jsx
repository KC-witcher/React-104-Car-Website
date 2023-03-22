import React, { useEffect, useState } from "react";
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
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorder } from "@mui/icons-material";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
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
  const { cars, setSort, sort, carType, setCarType } = useCar();
  const { favorites, toggleFavorite } = useFavorites();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = useState(false);
  const open = Boolean(anchorEl);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Nav />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Tooltip title="Sort">
          <IconButton
            aria-label="sort"
            size="large"
            onClick={() => setSort(!sort)}
          >
            <SortIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter">
          <IconButton
            aria-label="filter"
            size="large"
            id="filter-button"
            aria-controls={open ? "filter-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="filter-menu"
          aria-labelledby="filter-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={(e) => {
              handleClose();
              setCarType("AWD");
            }}
          >
            AWD
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              setCarType("RWD");
            }}
          >
            RWD
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              setCarType("FWD");
            }}
          >
            FWD
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              setCarType("All");
            }}
          >
            All
          </MenuItem>
        </Menu>
      </Stack>

      <Grid container rowSpacing={20} className="grid-layout">
        {cars.map((car) => {
          const isFavorite = favorites.find(
            (favorite) =>
              favorite.userId == user?.id && favorite.carId == car?.id
          );

          return (
            <Grid item key={car.id}>
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
