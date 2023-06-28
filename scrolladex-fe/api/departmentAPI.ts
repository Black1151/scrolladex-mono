import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { Department } from '../types';

export const getDepartmentsAPI = async (): Promise<Department[] | null> => {
  try {
    const response: AxiosResponse<Department[]> = await apiClient.get('/departments');
    return response.data;
  } catch (error) {
    console.error('Error getting departments', error);
    throw error;
  }
};

export const getDepartmentDropDownListAPI = async (): Promise<{id: number, departmentName: string}[] | null> => {
  try {
    const response: AxiosResponse<{id: number, departmentName: string}[]> = await apiClient.get('/departments/dropdown');
    return response.data;
  } catch (error) {
    console.error('Error getting department names', error);
    throw error;
  }
};

export const getDepartmentWithEmployeesAPI = async (id: number): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await apiClient.get(`/departments/${id}/with-employees`);
    return response.data;
  } catch (error) {
    console.error(`Error getting department with employees for id ${id}`, error);
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

export const updateDepartmentAPI = async (data: Department): Promise<Department | null> => {
  try {
    const response: AxiosResponse<Department> = await apiClient.put(`/departments/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating department with id ${data.id}`, error);
    throw error;
  }
};

export const deleteDepartmentAPI = async (id: number): Promise<number> => {
  try {
    const response: AxiosResponse<Department> = await apiClient.delete(`/departments/${id}`);
    return response.status;
  } catch (error) {
    console.error(`Error deleting department with id ${id}`, error);
    throw error;
  }
};
