import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Image,
  Grid,
  GridItem,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
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
    telephone: Yup.string()
      .matches(
        /^(?:\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
        "Please enter a valid UK phone number"
      )
      .required("Telephone number is a required field."),
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
  const { executeAction: fetchDropdownData } = useAsyncAction({
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
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchDropdownData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Grid
            templateColumns={[
              "1fr",
              null,
              null,
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={4}
          >
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Grid
                gap={4}
                rowGap={8}
                templateColumns={["1fr", null, "repeat(2, 1fr)"]}
                gridRow="span 2"
              >
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
                <AppFormInput
                  type="text"
                  name="empNo"
                  label="Employee Number"
                />
                <AppFormInput type="text" name="firstName" label="First Name" />
                <AppFormInput type="text" name="lastName" label="Last Name" />
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
                <AppFormInput type="text" name="telephone" label="Telephone" />
                <AppFormInput type="email" name="email" label="Email" />
              </Grid>
            </GridItem>
            <GridItem colSpan={[1, 2, null, null, 1]}>
              {!!!showUpload ? (
                <Box>
                  <Center>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_SERVER_ADDRESS! +
                          "/public" +
                          selectedEmployeeImageUrl || ""
                      }
                      alt="Profile"
                    />
                  </Center>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                      variant="blue"
                      onClick={() => {
                        formik.setFieldValue("profilePicture", null);
                        setShowUpload(true);
                      }}
                      width="auto"
                    >
                      Change Profile Picture
                    </Button>
                  </Box>
                </Box>
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
            </GridItem>
          </Grid>
          <Flex gap={4} pt={4}>
            <Button
              variant="red"
              onClick={() => handleModalClose(formik.resetForm)}
              flex={1}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              variant="green"
              type="submit"
              isLoading={formik.isSubmitting}
            >
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
