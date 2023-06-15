import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useDisclosure,
  Flex,
  HStack,
} from "@chakra-ui/react";
import AppFormInput from "../forms/AppFormInput";
import DragAndDropFileInput from "../forms/DragAndDropFileInput";
import { createEmployee } from "../../store/employeeSlice";
import { DepartmentListItem } from "@/types";
import ModalWrapper from "./ModalWrapper";
import { FormModalProps } from "@/types";
import { useSubmitHandler } from "@/hooks/submitHandler";
import { fetchDepartmentDropdownList } from "@/store/departmentSlice";
import { useAsyncAction } from "@/hooks/async";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is a required field."),
  firstName: Yup.string().required("First Name is a required field."),
  lastName: Yup.string().required("Last Name is a required field."),
  empNo: Yup.string().required("Employee Number is a required field."),
  jobTitle: Yup.string().required("Job Title is a required field."),
  departmentId: Yup.number().required("Department ID is a required field."),
  telephone: Yup.string().required("Telephone number is a required field."),
  email: Yup.string()
    .email("Please provide a valid email address.")
    .required("Email is a required field."),
  profilePicture: Yup.string().required(
    "Profile Picture URL is a required field."
  ),
});

interface Props extends FormModalProps {
  departmentList: DepartmentListItem[];
}

const AddEmployeeModal: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const departmentList = useSelector(
    (state: RootState) => state.department.departmentDropdownList.data
  );

  const handleSubmit = useSubmitHandler({
    apiFunction: createEmployee,
    successMessage: "Employee was added successfully",
    errorMessage: "An error occurred while adding the employee.",
    showSuccess: true,
    resetForm: true,
    onClose: onClose,
  });

  const fetchDropdownData = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Failed to fetch department list",
  });

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleModalClose = (formikReset: () => void) => {
    formikReset();
    onClose();
  };

  return (
    <ModalWrapper
      buttonText="Add Employee"
      title="Add Employee"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Formik
        initialValues={{
          title: "",
          firstName: "",
          lastName: "",
          empNo: "",
          jobTitle: "",
          departmentId: "",
          telephone: "",
          email: "",
          profilePicture: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Flex p={4} gap={4} flexDirection="column">
              <Flex flexDirection={["column", null, "row"]} gap={4}>
                <AppFormInput
                  type="select"
                  name="title"
                  label="Title"
                  options={[
                    { value: "Mr.", label: "Mr." },
                    { value: "Mrs.", label: "Mrs." },
                    { value: "Miss", label: "Miss" },
                    { value: "Ms.", label: "Ms." },
                    { value: "Dr.", label: "Dr." },
                  ]}
                />
                <AppFormInput type="text" name="firstName" label="First Name" />
                <AppFormInput type="text" name="lastName" label="Last Name" />
                <AppFormInput
                  type="text"
                  name="empNo"
                  label="Employee Number"
                />
              </Flex>
              <Flex flexDirection={["column", null, "row"]} gap={4}>
                <AppFormInput type="text" name="jobTitle" label="Job Title" />
                <AppFormInput
                  type="select"
                  name="departmentId"
                  label="Department"
                  options={departmentList?.map((department) => ({
                    value: department.id,
                    label: department.departmentName,
                  }))}
                />
              </Flex>
              <Flex flexDirection={["column", null, "row"]} gap={4}>
                <AppFormInput type="text" name="telephone" label="Telephone" />
                <AppFormInput type="email" name="email" label="Email" />
              </Flex>
              <FormControl
                isInvalid={
                  formik.touched.profilePicture &&
                  !!formik.errors.profilePicture
                }
              >
                <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
                <DragAndDropFileInput
                  onFile={(file) => {
                    formik.setFieldValue("profilePicture", file);
                  }}
                />
                <FormErrorMessage>
                  {formik.errors.profilePicture}
                </FormErrorMessage>
              </FormControl>
              <HStack mt={4} gap={[0, 4]} flex={1}>
                <Button
                  flex={1}
                  variant={"orange"}
                  onClick={() => handleModalClose(formik.resetForm)}
                >
                  Cancel
                </Button>
                <Button
                  variant={"green"}
                  type="submit"
                  isLoading={formik.isSubmitting}
                  flex={1}
                >
                  Submit
                </Button>
              </HStack>
            </Flex>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default AddEmployeeModal;
