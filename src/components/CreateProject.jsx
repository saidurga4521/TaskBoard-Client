import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { createproject } from "../services/projects";

const CreateProject = ({ onClose, fetchProjects }) => {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = async () => {
    if (!projectData.name.trim()) {
      return;
    }
    try {
      const response = await createproject(projectData);
      console.log("the response", response.data);
      fetchProjects();
    } catch (error) {
      console.log("the error", error.message);
    }
    setProjectData({ name: "", description: "" });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mx-auto my-10 relative"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
      >
        <X size={20} />
      </button>

      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-6">
        Create New Project
      </h2>

      <div className="flex flex-col gap-4">
        {/* Project Name */}
        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
        />

        {/* Project Description */}
        <textarea
          name="description"
          value={projectData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition resize-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <motion.button
            onClick={handleCreateProject}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          >
            <PlusCircle size={20} /> Create Project
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateProject;
