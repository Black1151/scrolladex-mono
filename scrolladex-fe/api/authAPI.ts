import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

interface User {
  id?: number;
  username: string;
  password: string;
}

interface AuthenticatedResponse {
  authenticated: boolean;
}

export const registerUserAPI = async (data: User): Promise<number | null> => {
  try {
    const response: AxiosResponse<User> = await apiClient.post('/register', data);
    return response.status;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
};

export const loginUserAPI = async (data: User): Promise<User | null> => {
  try {
    const response: AxiosResponse<User> = await apiClient.post('/login', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in user', error);
    throw error;
  }
};

export const logoutUserAPI = async (): Promise<number | null> => {
  try {
    const response: AxiosResponse<null> = await apiClient.post('/logout');
    return response.status;
  } catch (error) {
    console.error('Error logging out user', error);
    throw error;
  }
};

export const getProfileAPI = async (): Promise<User | null> => {
  try {
    const response: AxiosResponse<User> = await apiClient.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error getting user profile', error);
    throw error;
  }
};

export const checkSessionAPI = async (): Promise<AuthenticatedResponse> => {
  try {
    const response: AxiosResponse<AuthenticatedResponse> = await apiClient.get('/check-session', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error checking session', error);
    throw error;
  }
};



