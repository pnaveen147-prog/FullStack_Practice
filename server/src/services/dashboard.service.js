const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboard = async () => {
  const [
    totalUsers,

    totalProjects,

    totalTasks,

    completedTasks,

    pendingTasks,

    recentProjects,

    recentTasks,
  ] = await Promise.all([
    User.countDocuments(),

    Project.countDocuments(),

    Task.countDocuments(),

    Task.countDocuments({
      status: "Completed",
    }),

    Task.countDocuments({
      status: {
        $ne: "Completed",
      },
    }),

    Project.find()

      .sort({
        createdAt: -1,
      })

      .limit(5)

      .populate(
        "createdBy",

        "firstName lastName",
      ),

    Task.find()

      .sort({
        createdAt: -1,
      })

      .limit(5)

      .populate(
        "assignedTo",

        "firstName lastName",
      ),
  ]);

  return {
    totalUsers,

    totalProjects,

    totalTasks,

    completedTasks,

    pendingTasks,

    recentProjects,

    recentTasks,
  };
};

module.exports = {
  getDashboard,
};
