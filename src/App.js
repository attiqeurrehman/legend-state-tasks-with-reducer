import { useRef } from "react";
import AddTask from "./AddTask.js";
import TaskList from "./TaskList.js";
import tasksReducer from "./tasksReducer.js";
import { useObservableReducer, observer } from "@legendapp/state/react";

export default observer(function TaskApp() {
  const [observableTasks, dispatch] = useObservableReducer(
    tasksReducer,
    initialTasks
  );

  const tasks = observableTasks.get();

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary {++useRef(0).current}</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
});

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false }
];
