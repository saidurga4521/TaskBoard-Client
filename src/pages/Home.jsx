import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, FolderKanban, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateProject from "../components/CreateProject";
import { getProjects } from "../services/projects.js";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAddProject = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProjectClick = (project) => {
    navigate(`/task`, { state: { project } });
  };

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      console.log("the response", response.data);
      setProjects(response.data);
    } catch (error) {
      console.log("the error", error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Your Projects
          </h1>

          {projects.length > 0 && (
            <motion.button
              onClick={handleAddProject}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            >
              <PlusCircle size={20} /> Add Project
            </motion.button>
          )}
        </div>

        {/* Conditional Rendering */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow-lg p-10 max-w-lg mx-auto border border-gray-100"
          >
            <FolderKanban size={80} className="text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Projects Yet
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Start by creating your first project to organize your tasks.
            </p>

            <motion.button
              onClick={handleAddProject}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            >
              <PlusCircle size={20} /> Create Your First Project
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition relative"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {project.description || "No description provided."}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Tasks: {project.tasks?.length || 0}</span>
                  <span>Status: {project.status || "Active"}</span>
                </div>

                {/* Arrow button */}
                <button
                  onClick={() => handleProjectClick(project)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Render CreateProject modal */}
        {showModal && (
          <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
            <CreateProject
              onClose={handleCloseModal}
              fetchProjects={fetchProjects}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
