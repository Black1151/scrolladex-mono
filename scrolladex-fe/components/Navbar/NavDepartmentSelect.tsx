// DepartmentSelect.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";
import { RootState } from "@/store/store";
import { useAsyncAction } from "@/hooks/async";
import { fetchEmployeeOverview } from "@/store/employeeSlice";

interface DepartmentSelectProps {
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
}

const NavDepartmentSelect: React.FC<DepartmentSelectProps> = ({
  selectedDepartment,
  setSelectedDepartment,
}) => {
  const departmentList = useSelector(
    (state: RootState) => state.department.departmentDropdownList.data
  );
  const { executeAction: getEmployees } = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Error fetching employees",
  });

  return (
    <Select
      value={selectedDepartment}
      onChange={(e) => {
        setSelectedDepartment(e.target.value);
        getEmployees({
          searchField: "department_id",
          searchValue: e.target.value,
        });
      }}
      width="200px"
      bg="white"
      color="black"
    >
      <option value="">All departments</option>
      {departmentList !== null &&
        departmentList.map((department) => (
          <option key={department.departmentName} value={department.id}>
            {department.departmentName}
          </option>
        ))}
    </Select>
  );
};

export default NavDepartmentSelect;
