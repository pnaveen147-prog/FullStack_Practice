import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTasks,
  setFilters,
  createTask,
  updateTask,
  deleteTask,
} from "../../../store/taskSlice";

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

function Tasks() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
    project: "",
    assignedTo: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const { tasks, loading, error, filters, pagination } = useSelector(
    (state) => state.tasks,
  );

  useEffect(() => {
    dispatch(fetchTasks(filters));
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

  const handleSaveTask = () => {
    const payload = {
      ...formData,
      dueDate: formData.dueDate || undefined,
      project: formData.project || undefined,
      assignedTo: formData.assignedTo || undefined,
    };

    if (editingTaskId) {
      dispatch(
        updateTask({
          id: editingTaskId,
          payload,
        }),
      );
    } else {
      dispatch(createTask(payload));
    }

    setEditingTaskId(null);
    setFormData({
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
      project: "",
      assignedTo: "",
    });
  };

  const handleDeleteTask = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    dispatch(deleteTask(id));
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Task Title"
            name="title"
            value={formData.title}
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
            <InputLabel id="task-status-label">Status</InputLabel>
            <Select
              labelId="task-status-label"
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Todo">Todo</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Testing">Testing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="task-priority-label">Priority</InputLabel>
            <Select
              labelId="task-priority-label"
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Due Date"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Project ID"
            name="project"
            value={formData.project}
            onChange={handleInputChange}
          />

          <TextField
            label="Assigned To User ID"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
          />
        </Stack>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <TextField
            label="Search Task"
            placeholder="Title or description"
            value={filters.search}
            onChange={handleSearch}
            sx={{ width: 350 }}
          />

          <Button variant="contained" onClick={handleSaveTask}>
            {editingTaskId ? "Update Task" : "Create Task"}
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
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>
                        {task.project?.name || task.project || "-"}
                      </TableCell>
                      <TableCell>
                        {task.assignedTo
                          ? `${task.assignedTo.firstName || ""} ${task.assignedTo.lastName || ""}`.trim() ||
                            task.assignedTo.email ||
                            "-"
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1 }}
                          onClick={() => {
                            setEditingTaskId(task._id);
                            setFormData({
                              title: task.title,
                              description: task.description,
                              status: task.status,
                              priority: task.priority,
                              dueDate: task.dueDate
                                ? new Date(task.dueDate)
                                    .toISOString()
                                    .split("T")[0]
                                : "",
                              project: task.project?._id || task.project || "",
                              assignedTo:
                                task.assignedTo?._id || task.assignedTo || "",
                            });
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No Tasks Found
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

export default Tasks;
