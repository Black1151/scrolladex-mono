import axios, { AxiosResponse } from 'axios';
import { camelCase, snakeCase, isObject } from "lodash";

const convertKeys = (data: any, converter: (key: string) => string): any => {
  if (Array.isArray(data)) {
    return data.map(item => convertKeys(item, converter));
  } else if (isObject(data) && !isFile(data)) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (key === 'profilePicture') {
          return [converter(key), value];
        }
        return [converter(key), isObject(value) ? convertKeys(value, converter) : value];
      })
    );
  } else {
    console.log('data', data);
    return data;
  }
};

const isFile = (item: any): item is File => item instanceof File;
const isBlob = (item: any): item is Blob => item instanceof Blob;

const convertToFormData = (data: any): FormData => {
  const formData = new FormData();
  for (const key in data) {
    if (isFile(data[key]) || isBlob(data[key])) {
      formData.append(key, data[key]);
    } else if (typeof data[key] === "number") {
      formData.append(key, data[key].toString());
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

const containsFileOrBlob = (data: any): boolean => {
  for (const key in data) {
    if (isFile(data[key]) || isBlob(data[key])) {
      return true;
    }
  }
  return false;
};

const handleFormData = async (request: any) => {
  try {
    if (request.data) {
      request.data = convertKeys(request.data, snakeCase);
      if (containsFileOrBlob(request.data)) {
        request.data = convertToFormData(request.data);
      }
    }
    if (request.params) {
      request.params = convertKeys(request.params, snakeCase);
    }
    return request;
  } catch (error) {
    console.error('Error in request interceptor:', error);
    throw error; 
  }
}


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/api',
});

apiClient.interceptors.request.use(handleFormData);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) {
      response.data = convertKeys(response.data, camelCase);
    }
    return response;
  },
  (error) => {
    console.error('Axios error:', error, 'Axios response:', error.response, 'Axios error message:', error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
