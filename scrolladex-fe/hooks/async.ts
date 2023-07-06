import { useState } from 'react';
import { useErrorToast, useSuccessToast } from './toasts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/store/store";
import { AsyncThunk, unwrapResult } from '@reduxjs/toolkit';

interface ExecuteAction {
  (arg?: any): Promise<any>;
}

interface UseAsyncActionOptions {
  action: AsyncThunk<any, any, any>;
  successMessage?: string;
  errorMessage?: string | null;
  showSuccess?: boolean;
}

interface UseAsyncActionReturn {
  executeAction: ExecuteAction;
  isLoading: boolean;
}

export const useAsyncAction = (options: UseAsyncActionOptions): UseAsyncActionReturn => {
  const { action, successMessage = "Action executed successfully", errorMessage = null, showSuccess = false } = options;
  const dispatch: AppDispatch = useDispatch();
  const showErrorToast = useErrorToast();
  const showSuccessToast = useSuccessToast();
  
  const [isLoading, setIsLoading] = useState(false);

  const executeAction: ExecuteAction = async (arg?: any) => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(action(arg));
      const result = unwrapResult(resultAction);
      if (showSuccess) {
        showSuccessToast(successMessage);
      }
      return result;
    } catch (error: any) {
      if (errorMessage) {
        if (error.payload) {
          showErrorToast(`${errorMessage}: ${error.payload}`);
        } else {
          showErrorToast(errorMessage);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { executeAction, isLoading };
};
