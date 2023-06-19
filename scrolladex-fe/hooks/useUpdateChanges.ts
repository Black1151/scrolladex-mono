import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { isEqual } from 'lodash';

export const useUpdateChanges = (initialStateSelector: (state: RootState) => any) => {
  const initialState = useSelector(initialStateSelector);

  const getChanges = (updatedState: any) => {
    return Object.fromEntries(
      Object.entries(updatedState)
        .filter(([key, value]) => !isEqual(value, initialState[key]))
    );
  };

  return getChanges;
};
