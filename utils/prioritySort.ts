import { Task } from "../store/tasksSlice";

const prioritySort = (a: Task, b: Task) => {
  if (a.priority < b.priority) return -1;
  if (a.priority > b.priority) return 1;
  return 0;
};

export default prioritySort;
