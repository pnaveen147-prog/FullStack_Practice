import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskAPI from "../services/taskAPI";

const initialState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  },
  filters: {
    page: 1,
    limit: 10,
    search: "",
    status: "",
    priority: "",
    project: "",
    assignedTo: "",
  },
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (query, thunkAPI) => {
    try {
      const response = await taskAPI.getTasks(query);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks.",
      );
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (payload, thunkAPI) => {
    try {
      const response = await taskAPI.createTask(payload);
      thunkAPI.dispatch(fetchTasks(thunkAPI.getState().tasks.filters));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create task.",
      );
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, payload }, thunkAPI) => {
    try {
      const response = await taskAPI.updateTask(id, payload);
      thunkAPI.dispatch(fetchTasks(thunkAPI.getState().tasks.filters));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update task.",
      );
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      const response = await taskAPI.deleteTask(id);
      thunkAPI.dispatch(fetchTasks(thunkAPI.getState().tasks.filters));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete task.",
      );
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters(state) {
      state.filters = {
        page: 1,
        limit: 10,
        search: "",
        status: "",
        priority: "",
        project: "",
        assignedTo: "",
      };
    },
    clearSelectedTask(state) {
      state.selectedTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;

        const responseData = action.payload?.data ?? action.payload;
        const meta = action.payload?.meta ??
          action.payload?.pagination ?? {
            page: 1,
            limit: 10,
            totalPages: 0,
            totalRecords: 0,
          };

        state.tasks = Array.isArray(responseData)
          ? responseData
          : (responseData?.data ?? []);

        state.pagination = meta;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearSelectedTask } =
  taskSlice.actions;

export default taskSlice.reducer;
