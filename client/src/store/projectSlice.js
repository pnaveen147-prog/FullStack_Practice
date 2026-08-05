import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectAPI from "../services/projectAPI";

const initialState = {
  projects: [],
  selectedProject: null,
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
  },
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (query, thunkAPI) => {
    try {
      const response = await projectAPI.getProjects(query);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects.",
      );
    }
  },
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (payload, thunkAPI) => {
    try {
      const response = await projectAPI.createProject(payload);

      thunkAPI.dispatch(fetchProjects(thunkAPI.getState().projects.filters));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create project.",
      );
    }
  },
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, payload }, thunkAPI) => {
    try {
      const response = await projectAPI.updateProject(id, payload);

      thunkAPI.dispatch(fetchProjects(thunkAPI.getState().projects.filters));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update project.",
      );
    }
  },
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, thunkAPI) => {
    try {
      const response = await projectAPI.deleteProject(id);

      thunkAPI.dispatch(fetchProjects(thunkAPI.getState().projects.filters));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete project.",
      );
    }
  },
);

const projectSlice = createSlice({
  name: "projects",
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
      };
    },
    clearSelectedProject(state) {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;

        const responseData = action.payload?.data ?? action.payload;
        const meta = action.payload?.meta ??
          action.payload?.pagination ?? {
            page: 1,
            limit: 10,
            totalPages: 0,
            totalRecords: 0,
          };

        state.projects = Array.isArray(responseData)
          ? responseData
          : (responseData?.data ?? []);

        state.pagination = meta;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearSelectedProject } =
  projectSlice.actions;

export default projectSlice.reducer;
