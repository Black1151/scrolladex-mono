import { deptColors } from "../const/deptColors";

const useDepartmentColor = () => {
  const getDepartmentColor = (id: string) => {
    return deptColors[(parseInt(id, 10) - 1) % deptColors.length];
  };

  return { getDepartmentColor };
};

export default useDepartmentColor;
