import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { loginUserAPI } from "@/api/authAPI";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/AuthProvider";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await loginUserAPI({ username, password });
      setAuthenticated(true);
      router.push("/");
      toast({
        title: "Logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Login failed",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed",
          description: "An unknown error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box width="100%" maxW="md" mx="auto" mt="8">
      <Text pb={8} fontSize="3xl">
        Please sign in
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing="6">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button variant="green" type="submit">
            Log In
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginPage;
