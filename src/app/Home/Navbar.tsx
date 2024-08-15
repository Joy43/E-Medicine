"use client";

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
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "../Hooks/useAuth";
import Buttons from "../Component/Button/Buttons";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; 
import Badge from "@mui/material/Badge";
import useCart from "../Hooks/usecart";
const pages = [
  { name: "Policy", url: "/policy" },
  { name: "Contact", url: "/contact" },
  { name: "Dashboad", url: "/cart" },
];

const settings = [
  { name: "Profile", url: "/profile" },
  { name: "Dashboard", url: "/cart" },
  { name: "Account", url: "/account" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user, logOut } = useAuth() || {};
  const [cart] = useCart();
console.log(user);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#002540" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalPharmacyIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#0370F7" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#F60301",
              textDecoration: "none",
            }}
          >
            eMedicine
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#0370F7" }}
            >
              <MenuIcon />
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.url} passHref>
                    <Typography textAlign="center" sx={{ color: "#0370F7" }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LocalPharmacyIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#0370F7" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#F60301",
              textDecoration: "none",
            }}
          >
            eMedicine
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.name} href={page.url} sx={{ my: 2, color: "#0370F7", display: "block" }}>
                {page.name}
              </Button>
            ))}
          </Box>

          {/*----------- Go Product -----------------*/}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
  <IconButton onClick={() => router.push("/product")} sx={{ color: "#0370F7" }}>
    <Badge
      badgeContent={cart.length} 
      color="error"
      sx={{
        '& .MuiBadge-badge': {
          borderRadius: '12px',  
          minWidth: '24px',    
          height: '18px',        
          padding: '0 6px',      
        },
      }}
    >
      <ShoppingCartIcon fontSize="large" />
    </Badge>
  </IconButton>
</Box>
{/* ---------------user account---------- */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src={user?.photoURL || ""} />
                </IconButton>
              </Tooltip>
            ) : (
              <Buttons label={"Login"} onClick={() => router.push("/google")} />
            )}
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
              {user ? (
                <>
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Link href={setting.url} passHref>
                        <Typography textAlign="center" sx={{ color: "#0370F7" }}>
                          {setting.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center" sx={{ color: "#F60301" }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
