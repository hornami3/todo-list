import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Priority } from "../enums/Priority.enum";
import prioritySort from "../utils/prioritySort";

export interface Task {
  id: string;
  title: string;
  descriptions?: string;
  createdDate: string;
  priority: Priority;
  isDone: boolean;
}

export interface Section {
  id: string;
  title: string;
  tasks: Task[];
}

interface TasksState {
  sections: Section[];
}

const initialState: TasksState = {
  sections: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<Section>) => {
      state.sections.push(action.payload);
    },
    addTaskToSection: (
      state,
      action: PayloadAction<{ sectionId: string; task: Task }>
    ) => {
      const { sectionId, task } = action.payload;
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === sectionId
      );
      state.sections[sectionIndex].tasks.push(task);
      state.sections[sectionIndex].tasks.sort(prioritySort);
    },
    editTaskInSection: (
      state,
      action: PayloadAction<{
        sectionId: string;
        taskData: {
          id: string;
          title: string;
          description: string;
          priority: Priority;
        };
      }>
    ) => {
      const { sectionId, taskData } = action.payload;
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === sectionId
      );
      const taskIndex = state.sections[sectionIndex].tasks.findIndex(
        (task) => task.id === taskData.id
      );
      const task = state.sections[sectionIndex].tasks[taskIndex];
      state.sections[sectionIndex].tasks[taskIndex] = {
        ...task,
        title: taskData.title,
        descriptions: taskData.description,
        priority: taskData.priority,
      };
      state.sections[sectionIndex].tasks.sort(prioritySort);
    },
    removeTask: (
      state,
      action: PayloadAction<{ sectionId: string; taskId: string }>
    ) => {
      const { sectionId, taskId } = action.payload;
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === sectionId
      );
      state.sections[sectionIndex].tasks = state.sections[
        sectionIndex
      ].tasks.filter((task) => task.id !== taskId);
    },
    changeTaskStatus: (
      state,
      action: PayloadAction<{
        sectionId: string;
        taskId: string;
        taskStatus: boolean;
      }>
    ) => {
      const { sectionId, taskId, taskStatus } = action.payload;
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === sectionId
      );
      const taskIndex = state.sections[sectionIndex].tasks.findIndex(
        (task) => task.id === taskId
      );
      state.sections[sectionIndex].tasks[taskIndex].isDone = taskStatus;
    },
    setAllTasksDone: (state, action: PayloadAction<{ sectionId: string }>) => {
      const { sectionId } = action.payload;
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === sectionId
      );
      state.sections[sectionIndex].tasks = state.sections[
        sectionIndex
      ].tasks.map((task) => ({ ...task, isDone: true }));
    },
    editSectionTitle: (
      state,
      action: PayloadAction<{ sectionId: string; title: string }>
    ) => {
      const { sectionId, title } = action.payload;
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === sectionId
      );
      state.sections[sectionIndex].title = title;
    },
    removeSection: (state, action: PayloadAction<{ sectionId: string }>) => {
      const { sectionId } = action.payload;
      state.sections = state.sections.filter(
        (section) => section.id !== sectionId
      );
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;
