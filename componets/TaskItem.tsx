import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { GoKebabVertical } from "react-icons/go";
import { Priority } from "../enums/Priority.enum";
import TaskItemDialog from "./TaskItemDialog";
import { useAppDispatch } from "../hooks/reduxHelpers";
import { tasksActions } from "../store/tasksSlice";
import { ChangeEvent } from "react";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  isDone: boolean;
}

interface Props extends Task {
  sectionId: string;
}

const TaskItem = ({ id, title, priority, isDone, sectionId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const removeTaskHandler = () => {
    dispatch(tasksActions.removeTask({ sectionId, taskId: id }));
  };

  const taskStatusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      tasksActions.changeTaskStatus({
        sectionId,
        taskId: id,
        taskStatus: event.target.checked,
      })
    );
  };

  let priorityColor = "";
  switch (priority) {
    case Priority.Low:
      priorityColor = "green.500";
      break;
    case Priority.Medium:
      priorityColor = "orange.300";
      break;
    case Priority.High:
      priorityColor = "red.600";
      break;
  }

  return (
    <>
      <Box
        borderWidth={2}
        borderColor="gray.200"
        borderRadius={4}
        borderLeftWidth={4}
        borderLeftColor={priorityColor}
        width="100%"
        px={2}
        py={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Checkbox
            size="lg"
            colorScheme="blue"
            isChecked={isDone}
            onChange={taskStatusChangeHandler}
          />
          <Text
            width="100%"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {title}
          </Text>
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              size="sm"
              isRound
              icon={<Icon as={GoKebabVertical} />}
            />
            <MenuList>
              <MenuItem onClick={onOpen}>
                <HStack spacing={4}>
                  <Icon as={MdModeEdit} />
                  <Text fontSize="md">Edit task</Text>
                </HStack>
              </MenuItem>
              <MenuItem onClick={removeTaskHandler}>
                <HStack spacing={4}>
                  <Icon as={MdDelete} color="red.600" />
                  <Text fontSize="md" color="red.600">
                    Delete task
                  </Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <TaskItemDialog
        isOpen={isOpen}
        onClose={onClose}
        taskId={id}
        sectionId={sectionId}
      />
    </>
  );
};

export default TaskItem;
