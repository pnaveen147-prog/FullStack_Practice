import { Outlet, NavLink } from "react-router-dom";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import Navbar from "../components/NavBar";

const menuItems = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Users",
    path: "/app/users",
  },
  {
    label: "Projects",
    path: "/app/projects",
  },
  {
    label: "Tasks",
    path: "/app/tasks",
  },
];

function DashboardLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Navbar />

      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <Box
          component="aside"
          sx={{
            width: 250,
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <Toolbar />

          <Typography
            variant="subtitle1"
            sx={{
              paddingX: 2,
              paddingBottom: 1,
              fontWeight: "bold",
            }}
          >
            Navigation
          </Typography>

          <Divider />

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  "&.active": {
                    backgroundColor: "#1976d2",
                    color: "#ffffff",
                  },
                  "&.active:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            padding: 3,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e0e0e0",
          padding: 2,
        }}
      >
        <Typography variant="body2" align="center" color="text.secondary">
          © 2026 TaskFlow. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
