import React from 'react'
import { useTask } from './TaskContext'
import SearchBar from './SearchBar'

function Task() {
  const {
    taskList, setTaskList,
    modes, mode, selectMode,
    priorities, priority, selectPriority,
    taskValue, setTaskValue, AddTask,
    completed, setCompleted,
    totalTask, setTotalTask,
    search, active,
    editId, setEditId,
    editValue, setEditValue
  } = useTask()

  const handleTask = (e) => setTaskValue(e.target.value)

  const RemoveFromList = (id) => {
    const updated = taskList.filter(task => task.id !== id)
    setTaskList(updated)
    setTotalTask(updated.length)
    setCompleted(updated.filter(task => task.taskStatus === "Completed").length)
  }

  const toggleTaskStatus = (id) => {
    const updated = taskList.map(task =>
      task.id === id
        ? {
            ...task,
            taskStatus: task.taskStatus === "Pending" ? "Completed" : "Pending"
          }
        : task
    )
    setTaskList(updated)
    setCompleted(updated.filter(task => task.taskStatus === "Completed").length)
  }

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditValue(task.text);
  };

  const saveEdit = (id) => {
    const updated = taskList.map(task =>
      task.id === id ? { ...task, text: editValue } : task
    );
    setTaskList(updated);
    setEditId(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  const filteredTasks = taskList.filter(task => {
    const matchesSearch = search === "" || task.text.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = active === "All" || task.taskStatus === active
    return matchesSearch && matchesStatus
  })

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 space-y-6">
      <div className="flex justify-center space-x-6 mb-6">
        <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-lg shadow-md text-center min-w-[100px]">
          <h3 className="text-sm font-semibold">Total Tasks</h3>
          <p className="text-xl font-bold">{totalTask}</p>
        </div>
        <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-md text-center min-w-[100px]">
          <h3 className="text-sm font-semibold">Completed</h3>
          <p className="text-xl font-bold">{completed}</p>
        </div>
        <div className="bg-red-100 text-red-800 px-6 py-3 rounded-lg shadow-md text-center min-w-[100px]">
          <h3 className="text-sm font-semibold">Pending</h3>
          <p className="text-xl font-bold">{totalTask - completed}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-indigo-700">Task Manager</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Task Description"
          value={taskValue}
          onChange={handleTask}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={AddTask}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Task
        </button>
      </div>

      <div className="flex gap-4">
        <select
          onChange={selectMode}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {modes.map((node, id) => (
            <option value={id} key={id}>{node}</option>
          ))}
        </select>

        <select
          onChange={selectPriority}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {priorities.map((node, id) => (
            <option value={id} key={id}>{node}</option>
          ))}
        </select>
      </div>
      
      <SearchBar />

      <div className="space-y-4">
        {filteredTasks.map((node) => (
          <div key={node.id} className={`border rounded-md p-4 shadow-sm ${
            node.taskStatus === "Completed" ? "bg-green-50 border-green-300" : "bg-yellow-50 border-yellow-300"
          }`}>
            {editId === node.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(node.id)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-800">{node.text}</p>
                <p className="text-sm text-gray-600">Mode: {node.mode}</p>
                <p className="text-sm text-gray-600">Priority: {node.priority}</p>
                <p className={`text-sm font-semibold ${
                  node.taskStatus === "Completed" ? "text-green-600" : "text-yellow-600"
                }`}>
                  Status: {node.taskStatus}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => toggleTaskStatus(node.id)}
                    className={`px-3 py-1 rounded text-white transition ${
                      node.taskStatus === "Pending"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {node.taskStatus === "Pending" ? "Mark as Completed" : "Mark as Pending"}
                  </button>
                  <button
                    onClick={() => handleEdit(node)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => RemoveFromList(node.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Task;
