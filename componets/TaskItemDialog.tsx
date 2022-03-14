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
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { SingleValue } from "react-select";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextField from "./common/TextField";
import { Priority } from "../enums/Priority.enum";
import PrioritySelect from "./PrioritySelect";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHelpers";
import { tasksActions } from "../store/tasksSlice";

interface Props {
  sectionId: string;
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
}

const TaskItemDialog = ({ sectionId, taskId, isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>(Priority.Low);
  const [createdDate, setCreatedDate] = useState("");
  const sections = useAppSelector((state) => state.tasks.sections);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const task = sections
      .find((section) => section.id === sectionId)
      ?.tasks.find((task) => task.id === taskId);

    if (task) {
      setName(task.title);
      setDescription(task.descriptions || "");
      setPriority(task.priority);
      setCreatedDate(task.createdDate);
    }
  }, [
    sections,
    sectionId,
    taskId,
    setName,
    setDescription,
    setPriority,
    setCreatedDate,
  ]);

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const descriptionChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const priorityChangeHandler = (
    event: SingleValue<{ label: string; value: Priority }>
  ) => {
    setPriority(event!.value);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      tasksActions.editTaskInSection({
        sectionId,
        taskData: { id: taskId, title: name, description, priority },
      })
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <Divider />

        <Box as="form" onSubmit={submitHandler}>
          <ModalBody>
            <Text color="gray.400" my={4}>
              Created Date: {new Date(createdDate).toLocaleDateString()}
            </Text>
            <VStack spacing={6} align="normal">
              <TextField
                id="name"
                label="Task Name"
                value={name}
                onChange={nameChangeHandler}
                isRequired
                hasError={true}
                errorMessage="Name is required"
              />
              <Textarea
                value={description}
                onChange={descriptionChangeHandler}
                placeholder="Write a detailed description of the task"
              />

              <Box width="50%">
                <PrioritySelect
                  label="Priority"
                  value={priority}
                  onChange={priorityChangeHandler}
                />
              </Box>
            </VStack>
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

export default TaskItemDialog;
