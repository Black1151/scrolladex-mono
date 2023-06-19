// External dependencies
import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Flex,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

// Internal dependencies
import AppFormInput from "@/components/forms/AppFormInput";
import DragAndDropFileInput from "@/components/forms/DragAndDropFileInput";
import { useAsyncAction } from "@/hooks/async";
import { fetchDepartmentDropdownList } from "@/store/departmentSlice";
import { RootState } from "@/store/store";
import { EmployeeCreateUpdate } from "@/types";

const validationSchema = (shouldRequireProfilePicture: boolean) =>
  Yup.object({
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
    profilePicture: shouldRequireProfilePicture
      ? Yup.string().required("Profile Picture is a required field.")
      : Yup.string().nullable(),
  });

interface EmployeeFormProps {
  initialValues: EmployeeCreateUpdate;
  onSubmit: (
    values: EmployeeCreateUpdate,
    formikHelpers: FormikHelpers<EmployeeCreateUpdate>
  ) => Promise<void>;
  onClose: () => void;
  selectedEmployeeImageUrl?: string | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onSubmit,
  onClose,
  selectedEmployeeImageUrl,
}) => {
  const fetchDropdownData = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Failed to fetch department list",
  });

  const [showUpload, setShowUpload] = useState(true);

  useEffect(() => {
    if (selectedEmployeeImageUrl) {
      setShowUpload(false);
    } else {
      setShowUpload(true);
    }
  }, []);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const departmentList = useSelector(
    (state: RootState) => state.department.departmentDropdownList.data
  );

  const handleModalClose = (formikReset: () => void) => {
    formikReset();
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(showUpload)}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          {console.log("Formik errors", formik.errors)}
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
                    { value: "Miss", label: "Miss." },
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
              {!!!showUpload ? (
                <Flex flexDirection="column">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_SERVER_ADDRESS! +
                        "/public" +
                        selectedEmployeeImageUrl || ""
                    }
                    alt="Profile"
                  />
                  <Button
                    mt={2}
                    onClick={() => {
                      formik.setFieldValue("profilePicture", null);
                      setShowUpload(true);
                    }}
                  >
                    Change Profile Picture
                  </Button>
                </Flex>
              ) : (
                <FormControl
                  isInvalid={
                    formik.touched.profilePicture &&
                    !!formik.errors.profilePicture
                  }
                >
                  <FormLabel htmlFor="profilePicture">
                    Profile Picture
                  </FormLabel>
                  <DragAndDropFileInput
                    onFile={(file) => {
                      formik.setFieldValue("profilePicture", file);
                    }}
                  />
                  <FormErrorMessage>
                    {formik.errors.profilePicture}
                  </FormErrorMessage>
                </FormControl>
              )}
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
        </>
      )}
    </Formik>
  );
};

export default EmployeeForm;
