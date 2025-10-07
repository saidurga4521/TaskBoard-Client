const endpoints = {
  USER_SIGNUP: "/users/register",
  USER_LOGIN: "/users/login",
  USER_LOGOUT: "/users/logout",
  CREATE_PROJECT: "/projects/",
  GET_PROJECTS: "/projects/",
  DELETE_PROJECT: (id) => `/projects/${id}`,
  CREATE_TASK: "/tasks/",
  GET_TASKS: (projectId) => `/tasks/project/${projectId}`,
  UPDATE_TASK: (id) => `tasks/${id}`,
  DELETE_TASK: (id) => `tasks/${id}`,
};

export default endpoints;
