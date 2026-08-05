import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProjects,
  setFilters,
  createProject,
  updateProject,
  deleteProject,
} from "../../../store/projectSlice";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";

function Projects() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    startDate: "",
    endDate: "",
  });
  const [editingProjectId, setEditingProjectId] = useState(null);

  const { projects, loading, error, filters, pagination } = useSelector(
    (state) => state.projects,
  );

  useEffect(() => {
    dispatch(fetchProjects(filters));
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
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProject = () => {
    const payload = {
      ...formData,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
    };

    if (editingProjectId) {
      dispatch(
        updateProject({
          id: editingProjectId,
          payload,
        }),
      );
    } else {
      dispatch(createProject(payload));
    }

    setEditingProjectId(null);
    setFormData({
      name: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      startDate: "",
      endDate: "",
    });
  };

  const handleDeleteProject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    dispatch(deleteProject(id));
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Project Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
          />

          <FormControl fullWidth>
            <InputLabel id="project-status-label">Status</InputLabel>
            <Select
              labelId="project-status-label"
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Planning">Planning</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="project-priority-label">Priority</InputLabel>
            <Select
              labelId="project-priority-label"
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <TextField
            label="Search Project"
            placeholder="Name or description"
            value={filters.search}
            onChange={handleSearch}
            sx={{ width: 350 }}
          />

          <Button variant="contained" onClick={handleSaveProject}>
            {editingProjectId ? "Update Project" : "Create Project"}
          </Button>
        </Stack>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
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
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.status}</TableCell>
                      <TableCell>{project.priority}</TableCell>
                      <TableCell>
                        {project.startDate
                          ? new Date(project.startDate).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {project.endDate
                          ? new Date(project.endDate).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1 }}
                          onClick={() => {
                            setEditingProjectId(project._id);
                            setFormData({
                              name: project.name,
                              description: project.description,
                              status: project.status,
                              priority: project.priority,
                              startDate: project.startDate
                                ? new Date(project.startDate)
                                    .toISOString()
                                    .split("T")[0]
                                : "",
                              endDate: project.endDate
                                ? new Date(project.endDate)
                                    .toISOString()
                                    .split("T")[0]
                                : "",
                            });
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Projects Found
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

export default Projects;
