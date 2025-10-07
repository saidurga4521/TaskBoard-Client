import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  ArrowRightCircle,
  ArrowLeftCircle,
} from "lucide-react";
import AddTask from "../components/AddTask";
import {
  deleteByTask,
  getTasks,
  updateTask as updateTaskAPI,
} from "../services/tasks";
import { deleteByProject } from "../services/projects";

// ======================================================================
// TASK CARD COMPONENT
// ======================================================================
const TaskCard = ({ task, onDelete, onMove }) => {
  const getNextStatus = (status) =>
    status === "Todo"
      ? "In Progress"
      : status === "In Progress"
        ? "Done"
        : null;
  const getPrevStatus = (status) =>
    status === "Done"
      ? "In Progress"
      : status === "In Progress"
        ? "Todo"
        : null;

  const nextStatus = getNextStatus(task.status);
  const prevStatus = getPrevStatus(task.status);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 flex-1 pr-2">
          {task.title}
        </h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <p className="text-sm text-gray-500">{task.description}</p>

      <div className="flex justify-between mt-2">
        {prevStatus ? (
          <button
            onClick={() => onMove(task.id, prevStatus)}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-800 text-sm font-medium transition"
          >
            <ArrowLeftCircle size={16} /> {prevStatus}
          </button>
        ) : (
          <div />
        )}

        {nextStatus && (
          <button
            onClick={() => onMove(task.id, nextStatus)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition"
          >
            {nextStatus} <ArrowRightCircle size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

// ======================================================================
// COLUMN COMPONENT
// ======================================================================
const Column = ({ id, title, tasks, onDeleteTask, onMoveTask }) => {
  const columnStyles = {
    todo: "bg-slate-100/80 border-t-4 border-slate-400",
    inProgress: "bg-amber-100/80 border-t-4 border-amber-400",
    done: "bg-emerald-100/80 border-t-4 border-emerald-400",
  };
  const headerStyles = {
    todo: "bg-slate-200 text-slate-700",
    inProgress: "bg-amber-200 text-amber-800",
    done: "bg-emerald-200 text-emerald-800",
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2
          className={`inline-block text-lg font-semibold px-4 py-2 rounded-t-lg ${headerStyles[id]}`}
        >
          {title}
        </h2>
      </div>
      <div
        className={`rounded-2xl p-4 shadow-xl h-full flex flex-col gap-4 min-h-[250px] ${columnStyles[id]}`}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onMove={onMoveTask}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm italic text-center">
            No tasks here
          </p>
        )}
      </div>
    </div>
  );
};

// ======================================================================
// MAIN TASK BOARD COMPONENT
// ======================================================================
const Task = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const project = location.state?.project || {
    id: "proj1",
    name: "Sample Project",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskColumns, setTaskColumns] = useState({});

  // ----------------------------------------------------------------------
  // Fetch tasks from API
  // ----------------------------------------------------------------------
  const fetchTasks = async () => {
    try {
      const response = await getTasks(project._id || project.id);
      const columns = {
        todo: { name: "Todo", items: [] },
        inProgress: { name: "In Progress", items: [] },
        done: { name: "Done", items: [] },
      };

      const statusMap = {
        Todo: "todo",
        "In Progress": "inProgress",
        Done: "done",
      };

      response.data.forEach((task) => {
        const colKey = statusMap[task.status] || "todo";
        columns[colKey].items.push({
          id: task._id,
          title: task.title,
          description: task.description,
          status: task.status,
        });
      });

      setTaskColumns(columns);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ----------------------------------------------------------------------
  // Create new task (local only)
  // ----------------------------------------------------------------------
  const createTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
    };

    const statusMap = {
      Todo: "todo",
      "In Progress": "inProgress",
      Done: "done",
    };
    const columnId = statusMap[taskData.status] || "todo";

    setTaskColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: [newTask, ...prev[columnId].items],
      },
    }));

    console.log(
      `🚀 TASK CREATED: '${newTask.title}' added to '${taskData.status}'`
    );
    setIsModalOpen(false);
  };

  // ----------------------------------------------------------------------
  // Delete entire project
  // ----------------------------------------------------------------------
  const deleteProject = async (projectId) => {
    const response = await deleteByProject(projectId);
    console.log("theres-del", response.data);
    console.log(`❌ PROJECT DELETED: Project ${projectId} was deleted.`);

    navigate("/");
  };

  // ----------------------------------------------------------------------
  // Update task status in backend
  // ----------------------------------------------------------------------
  const updateTask = async (taskId, newStatus) => {
    try {
      await updateTaskAPI(taskId, { status: newStatus });
      console.log(`✅ TASK UPDATED: ${taskId} → ${newStatus}`);
    } catch (error) {
      console.error("❌ Error updating task:", error.message);
    }
  };

  // ----------------------------------------------------------------------
  // Move a task between columns
  // ----------------------------------------------------------------------
  const moveTask = (taskId, newStatus) => {
    const statusMap = {
      Todo: "todo",
      "In Progress": "inProgress",
      Done: "done",
    };

    const currentColumn = Object.keys(taskColumns).find((key) =>
      taskColumns[key].items.some((task) => task.id === taskId)
    );
    if (!currentColumn) return;

    const task = taskColumns[currentColumn].items.find((t) => t.id === taskId);
    const newColumn = statusMap[newStatus];

    if (!task || !newColumn) return;

    const updatedTask = { ...task, status: newStatus };

    setTaskColumns((prev) => ({
      ...prev,
      [currentColumn]: {
        ...prev[currentColumn],
        items: prev[currentColumn].items.filter((t) => t.id !== taskId),
      },
      [newColumn]: {
        ...prev[newColumn],
        items: [updatedTask, ...prev[newColumn].items],
      },
    }));

    updateTask(taskId, newStatus);
  };

  // ----------------------------------------------------------------------
  // Delete a task
  // ----------------------------------------------------------------------
  const deleteTask = (taskId) => {
    const columnId = Object.keys(taskColumns).find((colId) =>
      taskColumns[colId].items.some((item) => item.id === taskId)
    );

    if (columnId) {
      setTaskColumns((prev) => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          items: prev[columnId].items.filter((item) => item.id !== taskId),
        },
      }));
      console.log(`❌ TASK DELETED: ${taskId}`);
      deleteByTask(taskId).then((res) => {
        console.log("res-delete", res);
      });
    }
  };

  // ----------------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------------
  return (
    <>
      {isModalOpen && (
        <AddTask
          onAddTask={createTask}
          onClose={() => setIsModalOpen(false)}
          project={project}
          fetchTasks={fetch}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-100 p-6 pt-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              ← Back to Projects
            </motion.button>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              {project?.name}
            </h1>
            <p className="text-gray-500 mt-1">
              Use the arrows on each task to move between statuses.
            </p>
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
            >
              <PlusCircle size={18} /> Add Task
            </motion.button>

            <motion.button
              onClick={() => deleteProject(project._id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
            >
              <Trash2 size={18} /> Delete Project
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(taskColumns).map(([id, column]) => (
            <Column
              key={id}
              id={id}
              title={column.name}
              tasks={column.items}
              onDeleteTask={deleteTask}
              onMoveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
