import React from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppFormInput from "@/components/forms/AppFormInput";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSubmitHandler } from "@/hooks/submitHandler";
import { loginUser } from "@/store/authSlice";

const LoginPage = () => {
  const router = useRouter();

  const submitForm = useSubmitHandler({
    apiFunction: loginUser,
    successMessage: "Logged in successfully",
    errorMessage: "An error occurred while logging in.",
    showSuccess: true,
    resetForm: true,
  });

  const handleFormSubmit = async (
    values: { username: string; password: string },
    actions: FormikHelpers<{ username: string; password: string }>
  ) => {
    const result = await submitForm(values, actions);

    if (result && result.status === 200) {
      router.push("/");
    }
  };

  return (
    <Box width="100%" maxW="md" mx="auto" mt="8">
      <Text pb={8} fontSize="3xl">
        Please sign in
      </Text>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <VStack spacing="6">
            <AppFormInput label="Username" name="username" type="text" />
            <AppFormInput label="Password" name="password" type="password" />
            <Button variant="green" type="submit">
              Log In
            </Button>
          </VStack>
        </Form>
      </Formik>
    </Box>
  );
};

export default LoginPage;
