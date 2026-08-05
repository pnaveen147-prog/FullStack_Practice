import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const statistics = [
    {
      title: "Users",
      value: 0,
    },
    {
      title: "Projects",
      value: 0,
    },
    {
      title: "Tasks",
      value: 0,
    },
    {
      title: "Completed Tasks",
      value: 0,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          marginBottom: 4,
        }}
      >
        Welcome back,{" "}
        <strong>
          {user?.firstName} {user?.lastName}
        </strong>
      </Typography>

      <Grid container spacing={3}>
        {statistics.map((item) => (
          <Grid xs={12} sm={6} md={3} key={item.title}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    marginTop: 2,
                  }}
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          padding: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Logged-in User
        </Typography>

        <Divider
          sx={{
            marginBottom: 2,
          }}
        />

        <Stack spacing={1}>
          <Typography>
            <strong>Name:</strong> {user?.firstName} {user?.lastName}
          </Typography>

          <Typography>
            <strong>Email:</strong> {user?.email}
          </Typography>

          <Typography>
            <strong>Role:</strong> {user?.role}
          </Typography>
        </Stack>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          padding: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>

        <Divider
          sx={{
            marginBottom: 3,
          }}
        />

        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
          <Button variant="contained">Create User</Button>

          <Button variant="contained">Create Project</Button>

          <Button variant="contained">Create Task</Button>
        </Stack>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          padding: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>

        <Divider
          sx={{
            marginBottom: 2,
          }}
        />

        <Typography color="text.secondary">
          No recent activity available.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Dashboard;
