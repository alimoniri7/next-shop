import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GreenBtn from "../shared/buttons/GreenBtn";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountOptions = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    fetch("api/auth/verify-seller")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          setIsLoggedin(true);
        } else {
          setIsLoggedin(false);
        }
      });
  }, []);

  const logoutHandler = () => {
    const id = toast.loading("در حال خروج", { autoClose: 7000 });
    fetch("api/auth/signout")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.update(id, {
            render: "خروج انجام شد!",
            type: "success",
            autoClose: 7000,
            pauseOnFocusLoss: true,
            draggable: true,
            isLoading: false,
            pauseOnHover: true,
            hideProgressBar: false,
          });
          setTimeout(()=>{
            location.reload()
          },2000)
        } else {
          toast.update(id, {
            render: "خروج انجام نشد!",
            type: "error",
            autoClose: 7000,
            pauseOnFocusLoss: true,
            draggable: true,
            isLoading: false,
            pauseOnHover: true,
            hideProgressBar: false,
          });
        }
      })
      .catch((err) => {
        toast.update(id, {
          render: "خروج انجام نشد!",
          type: "error",
          autoClose: 7000,
          pauseOnFocusLoss: true,
          draggable: true,
          isLoading: false,
          pauseOnHover: true,
          hideProgressBar: false,
        });
      });
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {isLoggedin ? (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {avatarUrl ? (
              <Avatar alt="Remy Sharp" src={avatarUrl} />
            ) : (
              <AccountCircleIcon sx={{ color: "#fff", fontSize: "2rem" }} />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <Link href="/signin">
          <GreenBtn
            variant="outlined"
            size="small"
            sx={{ color: "#fff", borderColor: "#fff" }}
          >
            <Tooltip title="ورود / ثبت نام">
              <LoginIcon sx={{ fontSize: "1.5rem" }} />
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
        sx={{ mt: "45px", backgroundColor: "#ff0000779" }}
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
        <MenuItem
          onClick={handleCloseUserMenu}
          sx={{ backgroundColor: "#ffaa00877" }}
        >
          <DashboardIcon />
          <Typography mr={1} textAlign="center">
            داشبورد
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={handleCloseUserMenu}
          sx={{ backgroundColor: "#ffaa00877" }}
        >
          <AccountBoxIcon />
          <Typography mr={1} textAlign="center">
            پروفایل
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={logoutHandler}
          sx={{ backgroundColor: "#ffaa00877" }}
        >
          <LogoutIcon color="error" />
          <Typography mr={1} color="error" textAlign="center">
            خروج از حساب
          </Typography>
        </MenuItem>
      </Menu>
      <ToastContainer rtl theme="dark" />
    </Box>
  );
};

export default AccountOptions;
