import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Department, RequestState, DepartmentWithEmployees } from "@/types";
import handleAsyncReducers from "@/utils/handleAsyncReducers";
import { 
  getDepartmentsAPI, 
  createDepartmentAPI, 
  getDepartmentAPI, 
  updateDepartmentAPI, 
  deleteDepartmentAPI,
  getDepartmentDropDownListAPI,
  getDepartmentWithEmployeesAPI 
} from "@/api/departmentAPI";
import { fetchEmployeeOverview } from "./employeeSlice";

const initialRequestState = <T>(): RequestState<T> => ({
    data: null,
    status: 'idle',
    error: null
});

type DepartmentsState = {
  departmentEntities: RequestState<Department[]>;
  departmentWithEmployees: RequestState<DepartmentWithEmployees>;
  departmentDetail: RequestState<Department>;
  createDepartment: RequestState<number>;
  updateDepartment: RequestState<Department>;
  deleteDepartment: RequestState<void>;
  departmentDropdownList: RequestState<{id: number, departmentName: string}[]>;
};

const initialState: DepartmentsState = { 
  departmentEntities: initialRequestState<Department[]>(),
  departmentWithEmployees: initialRequestState<DepartmentWithEmployees>(),
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

  export const fetchDepartmentWithEmployees = createAsyncThunk(
    "departments/fetchDepartmentWithEmployees",
    async (id: number, thunkAPI) => {
      return handleThunkAPI(getDepartmentWithEmployeesAPI(id), thunkAPI);
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
      const response = await handleThunkAPI(createDepartmentAPI(newDepartment), thunkAPI);
      if (response) {
        thunkAPI.dispatch(fetchDepartmentDropdownList());
        thunkAPI.dispatch(fetchEmployeeOverview({}));
      }
      return response;
    }
  );
  
  export const updateDepartment = createAsyncThunk(
    "departments/updateDepartment",
    async (data: Department, thunkAPI) => {
      return handleThunkAPI(updateDepartmentAPI(data), thunkAPI);
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
      handleAsyncReducers({
        builder,
        asyncThunk: fetchDepartments,
        stateKey: 'departmentEntities'
      });
      
      handleAsyncReducers({
        builder,
        asyncThunk: fetchDepartment,
        stateKey: 'departmentDetail'
      });
      
      handleAsyncReducers({
        builder,
        asyncThunk: createDepartment,
        stateKey: 'createDepartment'
      });
      
      handleAsyncReducers({
        builder,
        asyncThunk: updateDepartment,
        stateKey: 'updateDepartment'
      });
      
      handleAsyncReducers({
        builder,
        asyncThunk: deleteDepartment,
        stateKey: 'deleteDepartment'
      });
      
      handleAsyncReducers({
        builder,
        asyncThunk: fetchDepartmentDropdownList,
        stateKey: 'departmentDropdownList'
      });
      
      handleAsyncReducers({
        builder,
        asyncThunk: fetchDepartmentWithEmployees,
        stateKey: 'departmentWithEmployees'
      });
    },
  });
  

export default departmentsSlice.reducer;
