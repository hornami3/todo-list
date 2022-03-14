import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextField from "./common/TextField";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHelpers";
import { tasksActions } from "../store/tasksSlice";
import generateId from "../utils/idGenerator";

interface Props {
  sectionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SectionDialog = ({ sectionId, isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const sections = useAppSelector((state) => state.tasks.sections);
  const dispatch = useAppDispatch();

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (sectionId) {
      dispatch(tasksActions.editSectionTitle({ sectionId, title: name }));
    } else {
      const data = {
        id: generateId(),
        title: name,
        tasks: [],
      };

      dispatch(tasksActions.addSection(data));
    }
    setName("");
    onClose();
  };

  useEffect(() => {
    const section = sections.find((section) => section.id === sectionId);

    if (section) {
      setName(section.title);
    } else {
      setName("");
    }
  }, [sectionId, sections, setName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{sectionId ? "Edit" : "Create"} Section</ModalHeader>
        <ModalCloseButton />
        <Divider />

        <Box as="form" onSubmit={submitHandler}>
          <ModalBody>
            <TextField
              id="name"
              label="Section Name"
              value={name}
              isRequired
              onChange={nameChangeHandler}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="blue">
              Save
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default SectionDialog;
