import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

interface Option {
  label: string;
  value: string | number;
}

interface AppFormInputProps {
  label: string;
  name: string;
  type: "text" | "email" | "select" | "number";
  options?: Option[];
}

const AppFormInput: React.FC<AppFormInputProps> = ({
  label,
  name,
  type,
  options,
}) => {
  const [field, meta] = useField(name);

  let inputElement;
  switch (type) {
    case "select":
      inputElement = (
        <Select {...field} id={name} placeholder="Select option">
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
      break;
    case "text":
    case "email":
    case "number":
    default:
      inputElement = <Input {...field} id={name} type={type} />;
      break;
  }

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {inputElement}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default AppFormInput;
