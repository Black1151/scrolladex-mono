import React, { FC, useState, useCallback, useRef } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useTheme, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

interface DragAndDropFileInputProps {
  onFile: (file: File | null) => void;
  [key: string]: any;
}

const DragAndDropFileInput: FC<DragAndDropFileInputProps> = ({
  onFile,
  ...props
}) => {
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const dragEnd = useRef(debounce(() => setDrag(false), 150));

  const theme = useTheme();

  const dragInHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounter.current++;
      if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
        setDrag(true);
      }
      dragEnd.current();
    },
    []
  );

  const dragOutHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current > 0) return;
      dragEnd.current();
    },
    []
  );

  const dropHandler = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDrag(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Uploaded file is not an image. Please upload an image file.");
        return;
      }
      setError(null);
      onFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onFile]
  );

  const fileChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        handleFile(event.target.files[0]);
      }
    },
    [handleFile]
  );

  const browseFilesHandler = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const resetHandler = useCallback(() => {
    onFile(null);
    setPreview(null);
  }, [onFile]);

  return (
    <VStack
      onDragEnter={dragInHandler}
      onDragLeave={dragOutHandler}
      onDragOver={dragInHandler}
      onDrop={dropHandler}
      border={error ? "1px solid red" : "1px solid"}
      borderColor={drag ? "pictonBlue" : "medPBlue"}
      borderRadius="20px"
      transition="border-color 0.3s ease-in-out"
      backgroundColor={drag ? "lightPBlue" : "#fff"}
      p="20px"
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
      {...props}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        ref={fileInputRef}
        type="file"
        onChange={fileChangeHandler}
        style={{ display: "none" }}
      />
      {preview ? (
        <>
          <Image src={preview} alt="preview" boxSize="100%" objectFit="cover" />
          <Button variant="blue" onClick={resetHandler} mt={4}>
            Change File
          </Button>
        </>
      ) : (
        <>
          <Text color="pictonBlue">
            {drag
              ? "Drop the file here..."
              : "Drag a file here, or click the button to select a file"}
          </Text>
          <FontAwesomeIcon
            color={drag ? theme.colors.pictonBlue : theme.colors.medPBlue}
            icon={faCloudUploadAlt}
            size="3x"
          />
          <Button variant="blue" onClick={browseFilesHandler} mt={4}>
            Browse Files
          </Button>
        </>
      )}
    </VStack>
  );
};

export default DragAndDropFileInput;
