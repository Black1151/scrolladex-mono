import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

interface Department {
  id?: number;
  departmentName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  town: string;
  county: string;
  postcode: string;
}

export const getDepartmentsAPI = async (): Promise<Department[] | null> => {
  try {
    const response: AxiosResponse<Department[]> = await apiClient.get('/departments');
    return response.data;
  } catch (error) {
    console.error('Error getting departments', error);
    throw error;
  }
};

export const getDepartmentAPI = async (id: number): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await apiClient.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting department with id ${id}`, error);
    throw error;
  }
};

export const createDepartmentAPI = async (data: Department): Promise<number | null> => {
  try {
    const response: AxiosResponse<Department> = await apiClient.post('/departments', data);
    return response.status;
  } catch (error) {
    console.error('Error creating department', error);
    throw error;
  }
};

export const updateDepartmentAPI = async (id: number, data: Department): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await apiClient.put(`/departments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating department with id ${id}`, error);
    throw error;
  }
};

export const deleteDepartmentAPI = async (id: number): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await apiClient.delete(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting department with id ${id}`, error);
    throw error;
  }
};
