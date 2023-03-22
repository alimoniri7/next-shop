import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ShopIcon from "@mui/icons-material/Shop";
import { useState } from "react";
import AccountOptions from "./AccountOptions";


const pages = ["محصولات", "وبلاگ", "ارتباط با ما"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };





  return (
    <AppBar position="static" sx={{ backgroundColor: "#1f262e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShopIcon
            sx={{ display: { xs: "none", md: "flex", color: "#fff" } }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "title !important",
              //   fontWeight: 700,
              color: "#fff",
              textDecoration: "none",
              letterSpacing: ".1rem",
              fontSize: "1.5rem",
            }}
          >
            Melo Shop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShopIcon
            sx={{ display: { xs: "flex", md: "none", color: "#fff" }, ml: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "title !important",
              color: "#fff",
              textDecoration: "none",
              letterSpacing: ".1rem",
              fontSize: "1.5rem",
            }}
          >
            Melo Shop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mr: 1 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <AccountOptions/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
