import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Department, RequestState } from "@/types";
import handleAsyncReducers from "@/utils/handleAsyncReducers";
import { 
  getDepartmentsAPI, 
  createDepartmentAPI, 
  getDepartmentAPI, 
  updateDepartmentAPI, 
  deleteDepartmentAPI,
  getDepartmentDropDownListAPI 
} from "@/api/departmentAPI";

const initialRequestState = <T>(): RequestState<T> => ({
    data: null,
    status: 'idle',
    error: null
});

type DepartmentsState = {
  departmentEntities: RequestState<Department[]>;
  departmentDetail: RequestState<Department>;
  createDepartment: RequestState<number>;
  updateDepartment: RequestState<Department>;
  deleteDepartment: RequestState<void>;
  departmentDropdownList: RequestState<{id: number, departmentName: string}[]>;
};

const initialState: DepartmentsState = { 
  departmentEntities: initialRequestState<Department[]>(),
  departmentDetail: initialRequestState<Department>(),
  createDepartment: initialRequestState<number>(),
  updateDepartment: initialRequestState<Department>(),
  deleteDepartment: initialRequestState<void>(),
  departmentDropdownList: initialRequestState<{id: number, departmentName: string}[]>(),
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

  export const fetchDepartmentDropdownList = createAsyncThunk( 
    "departments/fetchDepartmentDropdownList",
    async (_, thunkAPI) => {
      return handleThunkAPI(getDepartmentDropDownListAPI(), thunkAPI);
    }
  );
  
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
      handleAsyncReducers(builder, fetchDepartments, 'departmentEntities');
      handleAsyncReducers(builder, fetchDepartment, 'departmentDetail');
      handleAsyncReducers(builder, createDepartment, 'createDepartment');
      handleAsyncReducers(builder, updateDepartment, 'updateDepartment');
      handleAsyncReducers(builder, deleteDepartment, 'deleteDepartment');
      handleAsyncReducers(builder, fetchDepartmentDropdownList, 'departmentDropdownList');
    },
  });

export default departmentsSlice.reducer;
