import React, { useRef, useEffect } from "react";
import { Box, Slide, Grid, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Formik, Form, useFormikContext } from "formik";
import AppFormInput from "../forms/AppFormInput";
import { fetchEmployeeOverview } from "@/store/employeeSlice";
import { useAsyncAction } from "@/hooks/async";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetFormOnClose: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const formik = useFormikContext();

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

const SearchPanel: React.FC<SearchPanelProps> = ({ isOpen, onClose }) => {
  const slideRef = useRef<HTMLDivElement>(null);

  const { executeAction: getEmployees, isLoading: getEmployeesLoading } =
    useAsyncAction({
      action: fetchEmployeeOverview,
      errorMessage: "Error fetching employees",
    });

  useEffect(() => {
    if (isOpen && slideRef.current) {
      slideRef.current.focus();
    }
  }, [isOpen]);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (slideRef.current && !slideRef.current.contains(event.relatedTarget)) {
      onClose();
    }
  };

  return (
    <Box
      ref={slideRef}
      tabIndex={0}
      onBlur={handleBlur}
      position="fixed"
      right="0"
      zIndex="999"
      width={["100%", null, null, "50%"]}
    >
      <Slide
        direction="top"
        in={isOpen}
        style={{
          position: "relative",
          top: "60px",
        }}
      >
        <Box
          bg="lightPBlue"
          p={4}
          color="black"
          shadow="md"
          borderColor="pictonBlue"
          borderWidth="3px"
          borderTop="none"
          borderBottomRadius="lg"
        >
          <Formik
            initialValues={{
              searchField: "",
              searchValue: "",
            }}
            onSubmit={async (values) => {
              await getEmployees(values);
              onClose();
            }}
          >
            <Form>
              <ResetFormOnClose isOpen={isOpen} />
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 2fr auto" }}
                gap={4}
                alignItems="center"
              >
                <AppFormInput
                  placeholder="Search field"
                  name="searchField"
                  type="select"
                  options={[
                    { label: "First name", value: "first_name" },
                    { label: "Last name", value: "last_name" },
                    { label: "Job title", value: "job_title" },
                  ]}
                />
                <AppFormInput
                  placeholder="Search..."
                  icon={<SearchIcon color="gray.500" />}
                  name="searchValue"
                  type="text"
                />
                <Button
                  mt={2}
                  type="submit"
                  variant="green"
                  isLoading={getEmployeesLoading}
                >
                  Search
                </Button>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Slide>
    </Box>
  );
};

export default SearchPanel;
