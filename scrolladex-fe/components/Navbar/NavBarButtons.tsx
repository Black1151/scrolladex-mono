// NavBarButtons.tsx
import React from "react";
import { HStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBuilding,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import ModalIconButton from "../modals/ModalIconButton";
import NavDepartmentSelect from "./NavDepartmentSelect";

interface NavBarButtonsProps {
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  toggleSearchPanel: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  addEmployeeOnOpen: () => void;
  manageDepartmentsOnOpen: () => void;
  handleLogout: () => void;
  drawerOnOpen: () => void;
}

const NavBarButtons: React.FC<NavBarButtonsProps> = ({
  selectedDepartment,
  setSelectedDepartment,
  toggleSearchPanel,
  addEmployeeOnOpen,
  manageDepartmentsOnOpen,
  handleLogout,
  drawerOnOpen,
}) => {
  return (
    <>
      <HStack display={["none", null, null, "flex"]}>
        <NavDepartmentSelect
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
        />
        <ModalIconButton
          icon={<FontAwesomeIcon icon={faSearch} />}
          tooltipLabel="Search"
          onClick={toggleSearchPanel}
          hover={{ color: "emerald", backgroundColor: "white" }}
        />
        <ModalIconButton
          icon={<FontAwesomeIcon icon={faUserPlus} />}
          tooltipLabel="Add Employee"
          onClick={addEmployeeOnOpen}
          hover={{ color: "emerald", backgroundColor: "white" }}
        />
        <ModalIconButton
          icon={<FontAwesomeIcon icon={faBuilding} />}
          tooltipLabel="Manage Departments"
          onClick={manageDepartmentsOnOpen}
          hover={{ color: "emerald", backgroundColor: "white" }}
        />
        <ModalIconButton
          icon={<FontAwesomeIcon icon={faSignOutAlt} />}
          tooltipLabel="Logout"
          bg="bittersweet"
          hover={{ color: "bittersweet", backgroundColor: "white" }}
          onClick={handleLogout}
        />
      </HStack>
      <Box display={["block", null, null, "none"]}>
        <Box>
          <ModalIconButton
            bg="pictonBlue"
            icon={<HamburgerIcon />}
            onClick={drawerOnOpen}
            hover={{ color: "pictonBlue", backgroundColor: "white" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default NavBarButtons;
