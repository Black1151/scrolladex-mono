import React from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppFormInput from "@/components/forms/AppFormInput";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSubmitHandler } from "@/hooks/submitHandler";
import { loginUser } from "@/store/authSlice";
import { FaUser, FaLock } from "react-icons/fa";
import { useTheme } from "@chakra-ui/react";

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();

  const submitForm = useSubmitHandler({
    apiFunction: loginUser,
    successMessage: "Logged in successfully",
    errorMessage: "Authentication failed",
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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgImage="url('/images/loginBG.jpg')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      width="100%"
      height="100vh"
      overflowY="hidden"
    >
      <Box
        maxW="md"
        bg="white"
        boxShadow="xl"
        borderRadius="lg"
        borderColor="medPBlue"
        borderWidth={3}
      >
        <Text
          borderTopRadius="md"
          fontSize="3xl"
          py={2}
          bg="pictonBlue"
          color="white"
          textAlign="center"
        >
          Scroll-a-dex!
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
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form>
            <Box p={6}>
              <VStack spacing="4">
                <AppFormInput
                  name="username"
                  type="text"
                  icon={<FaUser color={theme.colors.pictonBlue} />}
                />
                <AppFormInput
                  name="password"
                  type="password"
                  icon={<FaLock color={theme.colors.pictonBlue} />}
                />
              </VStack>
              <Button mt={8} variant="green" type="submit">
                Log In
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;
