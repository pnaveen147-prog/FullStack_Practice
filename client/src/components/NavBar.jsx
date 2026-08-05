import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          TaskFlow
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        {isAuthenticated && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            {user && (
              <Box
                sx={{
                  textAlign: "right",
                }}
              >
                <Typography variant="body1">
                  {user.firstName} {user.lastName}
                </Typography>

                <Typography variant="caption">{user.role}</Typography>
              </Box>
            )}

            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderColor: "#ffffff",
                color: "#ffffff",
                "&:hover": {
                  borderColor: "#ffffff",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
