import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../toolkit/userSlice.js";
import CreateProject from "../components/CreateProject.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, type: "spring" },
    },
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Title */}
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-white text-3xl font-extrabold tracking-wide cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Mini <span className="text-teal-400">TaskBoard</span>
            </motion.h1>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Add Project Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-teal-500 text-white font-semibold px-5 py-2 rounded-2xl hover:bg-teal-400 transition"
                onClick={() => setModalOpen(true)} // open modal
              >
                <Plus size={20} /> Add Project
              </motion.button>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-500 text-white font-semibold px-5 py-2 rounded-2xl hover:bg-red-400 transition"
              >
                Logout
              </motion.button>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setOpen(!open)}
                className="text-white focus:outline-none"
              >
                {open ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden bg-gray-800 px-4 py-5 space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white font-semibold px-5 py-2 rounded-2xl hover:bg-teal-400 transition"
              onClick={() => setModalOpen(true)} // open modal
            >
              <Plus size={20} /> Add Project
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full bg-red-500 text-white font-semibold px-5 py-2 rounded-2xl hover:bg-red-400 transition"
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </motion.nav>

      {modalOpen && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <CreateProject onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default Navbar;
