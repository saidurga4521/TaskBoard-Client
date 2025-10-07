import React, { useState } from "react";
import { motion } from "framer-motion";
import { createTask } from "../services/tasks";

const AddTask = ({ onAddTask, onClose, project, fetchTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Todo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!taskData.title.trim()) {
      return;
    }
    try {
      console.log("the payload", taskData);
      const response = await createTask({
        ...taskData,
        projectId: project._id,
      });
      console.log("the response", response.data);
      console.log("refetching2....");
      fetchTasks(project._id);
      console.log("refetching1....");
      onClose();
    } catch (error) {
      console.log("the error", error.message);
    }

    setTaskData({ title: "", description: "", status: "Todo" });
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-6">
          Add New Task
        </h2>

        <div className="flex flex-col gap-4">
          {/* Task Title */}
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
          />

          {/* Task Description */}
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition resize-none"
          />

          {/* Task Status */}
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            >
              Add Task
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddTask;
