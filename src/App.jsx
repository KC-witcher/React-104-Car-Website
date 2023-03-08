import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider";
import { CarsProvider } from "./providers/car-provider";
import { FavoriteProvider } from "./providers/fav-provider";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Favorite } from "./components/Favorites";

function App() {
  return (
    <AuthProvider>
      <CarsProvider>
        <FavoriteProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/favorite" element={<Favorite />} />
            </Routes>
          </Router>
        </FavoriteProvider>
      </CarsProvider>
    </AuthProvider>
  );
}

export default App;
