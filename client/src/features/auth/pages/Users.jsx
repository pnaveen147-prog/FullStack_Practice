import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUsers,
  setFilters,
  createUser,
  updateUser,
  deleteUser,
} from "../../../store/userSlice";

import {
  Box,
  Typography,
  Paper,
  TextField,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Button,
  Stack,
} from "@mui/material";

function Users() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",

    lastName: "",

    email: "",

    password: "",

    age: "",

    role: "User",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const { users, loading, error, filters, pagination } = useSelector(
    (state) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers(filters));
  }, [dispatch, filters]);

  const handleSearch = (event) => {
    dispatch(
      setFilters({
        search: event.target.value,
        page: 1,
      }),
    );
  };

  const handlePageChange = (event, newPage) => {
    dispatch(
      setFilters({
        page: newPage + 1,
      }),
    );
  };

  const handleRowsPerPageChange = (event) => {
    dispatch(
      setFilters({
        limit: Number(event.target.value),
        page: 1,
      }),
    );
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,

      [event.target.name]: event.target.value,
    });
  };

  const handleSaveUser = () => {
    const payload = { ...formData };

    if (editingUserId && !payload.password) {
      delete payload.password;
    }

    if (editingUserId) {
      dispatch(
        updateUser({
          id: editingUserId,

          payload,
        }),
      );
    } else {
      dispatch(createUser(payload));
    }

    setEditingUserId(null);

    setFormData({
      firstName: "",

      lastName: "",

      email: "",

      password: "",

      age: "",

      role: "User",
    });
  };

  const handleDeleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    dispatch(deleteUser(id));
  };

  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
          />
        </Stack>
      </Paper>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Search User"
            placeholder="Name or Email"
            value={filters.search}
            onChange={handleSearch}
            sx={{
              width: 350,
            }}
          />

          <Button variant="contained" onClick={handleSaveUser}>
            {editingUserId ? "Update User" : "Create User"}
          </Button>
        </Stack>
      </Paper>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" sx={{ justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>

                  <TableCell>Last Name</TableCell>

                  <TableCell>Email</TableCell>

                  <TableCell>Age</TableCell>

                  <TableCell>Role</TableCell>

                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.firstName}</TableCell>

                      <TableCell>{user.lastName}</TableCell>

                      <TableCell>{user.email}</TableCell>

                      <TableCell>{user.age}</TableCell>

                      <TableCell>{user.role}</TableCell>

                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            mr: 1,
                          }}
                          onClick={() => {
                            setEditingUserId(user._id);

                            setFormData({
                              firstName: user.firstName,

                              lastName: user.lastName,

                              email: user.email,

                              password: "",

                              age: user.age,

                              role: user.role,
                            });
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Users Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"

            count={pagination?.totalRecords ?? 0}

            page={Math.max((pagination?.page ?? 1) - 1, 0)}

            rowsPerPage={pagination?.limit ?? 10}

            onPageChange={handlePageChange}

            onRowsPerPageChange={handleRowsPerPageChange}

            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Paper>
      )}
    </Box>
  );
}

export default Users;
