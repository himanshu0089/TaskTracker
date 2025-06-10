import { createContext, useContext, useState } from "react";

const TaskContext = createContext({});

const TaskProvider = ({ children }) => {
  const modes = ["Work", "Personal", "Learning"];
  const priorities = ["Low", "Medium", "High"];
  const status = ["All", "Pending", "Completed"];

  const [taskList, setTaskList] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [mode, setMode] = useState(0);
  const [priority, setPriority] = useState(0);
  const [totalTask, setTotalTask] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All"); 

  const AddTask = () => {
    const trimmed = taskValue.trim();
    if (trimmed === "") return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      mode: modes[mode],
      priority: priorities[priority],
      taskStatus: "Pending",
    };

    setTaskList((prev) => [...prev, newTask]);
    setTaskValue("");
    setTotalTask((prev) => prev + 1);
  };

  const selectMode = (e) => {
    setMode(Number(e.target.value));
  };

  const selectPriority = (e) => {
    setPriority(Number(e.target.value));
  };

  const state = {
    taskList,
    setTaskList,
    taskValue,
    setTaskValue,
    mode,
    selectMode,
    priority,
    selectPriority,
    AddTask,
    modes,
    priorities,
    totalTask,
    setTotalTask,
    completed,
    setCompleted,
    search,
    setSearch,
    active,
    setActive,
    status
  };

  return (
    <TaskContext.Provider value={state}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => useContext(TaskContext);

export { useTask, TaskProvider };
