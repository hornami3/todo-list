import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoKebabVertical } from "react-icons/go";
import { MdDone, MdModeEdit, MdDelete } from "react-icons/md";
import FilterButton from "./common/FilterButton";
import TaskItem from "./TaskItem";
import { Task } from "../store/tasksSlice";
import { useAppDispatch } from "../hooks/reduxHelpers";
import { tasksActions } from "../store/tasksSlice";
import generateId from "../utils/idGenerator";
import { Priority } from "../enums/Priority.enum";

interface Props {
  id: string;
  title: string;
  taskItems: Task[];
  onEditSection: (sectionId: string) => void;
}

const TaskItemsList = ({ id, title, taskItems, onEditSection }: Props) => {
  const [showTodoTasks, setShowTodoTasks] = useState(false);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>(taskItems);
  const dispatch = useAppDispatch();

  const showDoneTasksHandler = () => {
    setTasks(taskItems.filter((task) => task.isDone));
    setShowTodoTasks(false);
    setShowDoneTasks(true);
  };

  const showTodoTasksHandler = () => {
    setTasks(taskItems.filter((task) => !task.isDone));
    setShowTodoTasks(true);
    setShowDoneTasks(false);
  };

  const showAllTasksHandler = () => {
    setTasks(taskItems);
    setShowTodoTasks(false);
    setShowDoneTasks(false);
  };

  const taskTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const addTaskHandler = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      id: generateId(),
      title: taskTitle,
      createdDate: new Date().toISOString(),
      priority: Priority.Low,
      isDone: false,
    };

    dispatch(tasksActions.addTaskToSection({ sectionId: id, task: data }));
    setTaskTitle("");
  };

  const markAllTasksDoneHandler = () => {
    dispatch(tasksActions.setAllTasksDone({ sectionId: id }));
  };

  const removeSectionHandler = () => {
    dispatch(tasksActions.removeSection({ sectionId: id }));
  };

  useEffect(() => {
    setTasks(taskItems);

    if (showTodoTasks) {
      setTasks(taskItems.filter((task) => !task.isDone));
    } else if (showDoneTasks) {
      setTasks(taskItems.filter((task) => task.isDone));
    }
  }, [showTodoTasks, showDoneTasks, taskItems, setTasks]);

  return (
    <Box
      bg="white"
      maxW="sm"
      width="100%"
      height="max-content"
      p={4}
      borderRadius={4}
      boxShadow="md"
    >
      <Box display="flex">
        <Heading
          as="h2"
          size="md"
          width="100%"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {title}
        </Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            variant="ghost"
            size="sm"
            isRound
            icon={<Icon as={GoKebabVertical} />}
          />
          <MenuList>
            <MenuItem onClick={markAllTasksDoneHandler}>
              <HStack spacing={4}>
                <Icon as={MdDone} />
                <Text fontSize="md">Mark All Done</Text>
              </HStack>
            </MenuItem>
            <MenuItem onClick={() => onEditSection(id)}>
              <HStack spacing={4}>
                <Icon as={MdModeEdit} />
                <Text fontSize="md">Edit List</Text>
              </HStack>
            </MenuItem>
            <MenuItem onClick={removeSectionHandler}>
              <HStack spacing={4}>
                <Icon as={MdDelete} color="red.600" />
                <Text fontSize="md" color="red.600">
                  Delete List
                </Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {taskItems.length > 0 && (
        <ButtonGroup spacing={6} my={4}>
          <FilterButton
            text="All"
            isActive={!showDoneTasks && !showTodoTasks}
            onClick={showAllTasksHandler}
          />
          <FilterButton
            text="To do"
            isActive={showTodoTasks && !showDoneTasks}
            onClick={showTodoTasksHandler}
          />
          <FilterButton
            text="Done"
            isActive={showDoneTasks && !showTodoTasks}
            onClick={showDoneTasksHandler}
          />
        </ButtonGroup>
      )}

      <VStack align="flex-start">
        {tasks.map((taskItem) => (
          <TaskItem
            key={taskItem.id}
            id={taskItem.id}
            title={taskItem.title}
            priority={taskItem.priority}
            isDone={taskItem.isDone}
            sectionId={id}
          />
        ))}
      </VStack>

      <Box as="form" onSubmit={addTaskHandler}>
        <HStack mt={4} mb={2}>
          <Input
            value={taskTitle}
            placeholder="Add task"
            size="md"
            borderRadius={4}
            isRequired
            onChange={taskTitleChangeHandler}
          />
          <Button type="submit" size="md" colorScheme="blue" borderRadius={4}>
            Add
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default TaskItemsList;
