// Libraries
import React, { useState } from "react";
import { useRouter } from "next/router";

// Chakra UI components
import { useDisclosure } from "@chakra-ui/react";

// Local components
import AddEmployeeModal from "../modals/AddEmployeeModal";
import ManageDepartmentsModal from "../modals/ManageDepartmentsModal";
import SearchPanel from "../other/SearchPanel";
import NavDrawer from "./NavDrawer";
import NavbarContainer from "./NavbarContainer";

// Store and hooks
import { useAsyncAction } from "@/hooks/async";
import { logoutUser } from "@/store/authSlice";

const Navbar: React.FC = () => {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const onClose = () => {
    setIsSearchPanelOpen(false);
    setSelectedDepartment("");
  };

  const toggleSearchPanel = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event && event.preventDefault();
    setIsSearchPanelOpen(!isSearchPanelOpen);
  };

  const router = useRouter();

  const {
    onOpen: addEmployeeOnOpen,
    isOpen: addEmployeeIsOpen,
    onClose: addEmployeeOnClose,
  } = useDisclosure();
  const {
    onOpen: manageDepartmentsOnOpen,
    isOpen: manageDepartmentsIsOpen,
    onClose: manageDepartmentsOnClose,
  } = useDisclosure();

  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  const { executeAction: logOut } = useAsyncAction({
    action: logoutUser,
    errorMessage: "Error logging out",
  });

  const handleLogout = async () => {
    await logOut();
    router.replace("/login");
  };

  const navDrawerProps = {
    drawerIsOpen,
    drawerOnClose,
    addEmployeeOnOpen,
    manageDepartmentsOnOpen,
    toggleSearchPanel,
    handleLogout,
  };

  const navbarButtonsProps = {
    selectedDepartment,
    setSelectedDepartment,
    toggleSearchPanel,
    addEmployeeOnOpen,
    manageDepartmentsOnOpen,
    handleLogout,
    drawerOnOpen,
  };

  return (
    <>
      <NavbarContainer navbarButtonsProps={navbarButtonsProps} />
      <NavDrawer {...navDrawerProps} />
      <SearchPanel isOpen={isSearchPanelOpen} onClose={onClose} />
      <AddEmployeeModal
        isOpen={addEmployeeIsOpen}
        onClose={addEmployeeOnClose}
      />
      <ManageDepartmentsModal
        isOpen={manageDepartmentsIsOpen}
        onClose={manageDepartmentsOnClose}
      />
    </>
  );
};

export default Navbar;
