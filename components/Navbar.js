import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShopIcon from "@mui/icons-material/Shop";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import GreenBtn from "./shared/buttons/GreenBtn";
import LoginIcon from '@mui/icons-material/Login';
import Link from "next/link";

const pages = ["محصولات", "وبلاگ", "ارتباط با ما"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1f262e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShopIcon sx={{ display: { xs: "none", md: "flex", color: '#fff' } }} />
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
              fontSize: '1.5rem'
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
              <MenuIcon sx={{color: '#fff'}} />
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
          <ShopIcon sx={{ display: { xs: "flex", md: "none", color: '#fff' }, ml: 1 }} />
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
              fontSize: '1.5rem'
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

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedin ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {avatarUrl ? (
                    <Avatar alt="Remy Sharp" src={avatarUrl} />
                  ) : (
                    <AccountCircleIcon
                      sx={{ color: "#fff", fontSize: "2rem" }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            ) : (
                <Link href='/signup'>
                                <GreenBtn variant="outlined" size='small' sx={{ color: '#fff', borderColor: '#fff'}} >
                  <Tooltip title="ورود / ثبت نام">
                <LoginIcon sx={{fontSize: '1.5rem'}}/>
              </Tooltip>
                </GreenBtn>
                </Link>
            )}

            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {avatarUrl ? (
                  <Avatar alt="Remy Sharp" src={avatarUrl} />
                ) : (
                  <AccountCircleIcon sx={{color: '#fff', fontSize: '2rem'}}  />
                )}
              </IconButton>
            </Tooltip> */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
