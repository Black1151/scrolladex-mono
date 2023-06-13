import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Department, RequestState } from "@/types";
import handleAsyncReducers from "@/utils/handleAsyncReducers";
import { 
  getDepartmentsAPI, 
  createDepartmentAPI, 
  getDepartmentAPI, 
  updateDepartmentAPI, 
  deleteDepartmentAPI 
} from "@/api/departmentAPI";

const initialRequestState = <T>(): RequestState<T> => ({
    data: null,
    status: 'idle',
    error: null
});

type DepartmentsState = {
  departments: RequestState<Department[]>;
  departmentDetail: RequestState<Department>;
  createStatus: RequestState<number>;
  updateStatus: RequestState<Department>;
  deleteStatus: RequestState<void>;
};

const initialState: DepartmentsState = { 
  departments: initialRequestState<Department[]>(),
  departmentDetail: initialRequestState<Department>(),
  createStatus: initialRequestState<number>(),
  updateStatus: initialRequestState<Department>(),
  deleteStatus: initialRequestState<void>(),
};

const handleThunkAPI = async (apiCall: Promise<any>, thunkAPI: any) => {
    try {
      const response = await apiCall;
      return response;
    } catch (error) {
      const err = error as Error;
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  };
  
  export const fetchDepartments = createAsyncThunk(
    "departments/fetchDepartments",
    async (_, thunkAPI) => {
      return handleThunkAPI(getDepartmentsAPI(), thunkAPI);
    }
  );
  
  export const fetchDepartment = createAsyncThunk(
    "departments/fetchDepartment",
    async (id: number, thunkAPI) => {
      return handleThunkAPI(getDepartmentAPI(id), thunkAPI);
    }
  );
  
  export const createDepartment = createAsyncThunk(
    "departments/createDepartment",
    async (newDepartment: Department, thunkAPI) => {
      return handleThunkAPI(createDepartmentAPI(newDepartment), thunkAPI);
    }
  );
  
  export const updateDepartment = createAsyncThunk(
    "departments/updateDepartment",
    async (data: {id: number, department: Department}, thunkAPI) => {
      return handleThunkAPI(updateDepartmentAPI(data.id, data.department), thunkAPI);
    }
  );
  
  export const deleteDepartment = createAsyncThunk(
    "departments/deleteDepartment",
    async (id: number, thunkAPI) => {
      return handleThunkAPI(deleteDepartmentAPI(id), thunkAPI);
    }
  );

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchDepartments, 'departmentsStatus', 'departmentsData', 'departmentsError');
    handleAsyncReducers(builder, fetchDepartment, 'departmentDetailStatus', 'departmentDetailData', 'departmentDetailError');
    handleAsyncReducers(builder, createDepartment, 'createStatus', 'createData', 'createError');
    handleAsyncReducers(builder, updateDepartment, 'updateStatus', 'updateData', 'updateError');
    handleAsyncReducers(builder, deleteDepartment, 'deleteStatus', 'deleteData', 'deleteError');
  },
});

export default departmentsSlice.reducer;
