export interface ErrorObject {
  response?: {
    status: number;
  };
  request?: any;
}

export interface FormModalProps {
  createOnSubmitHandler: (
    apiFunction: (values: any) => Promise<any>,
    successMessage: string,
    errorMessage: string
  ) => (values: any, actions: any) => Promise<void>;
}

export interface Department {
  id?: number;
  departmentName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  town: string;
  county: string;
  postcode: string;
}

export type DepartmentListItem = {
    id: number;
    departmentName: string;
  };

export interface Employee {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    empNo: string;
    jobTitle: string;
    departmentId: string;
    departmentName?: string;
    telephone: string;
    email: string;
    profilePictureUrl: string | null;
  }

export type EmployeeCreateUpdate = Omit<Employee, 'profilePictureUrl' | 'id'> & {
    id?: number;
    profilePicture?: File | Blob | string | null;
    profilePictureUrl?: string;
};

export type EmployeeOverview = Pick<Employee, 'firstName' | 'lastName' | 'jobTitle' | 'departmentName' | 'profilePictureUrl'> & { id: number };

/// REDUX TYPES

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type RequestState<T> = {
    data: T | null;
    status: RequestStatus;
    error: string | null;
  };