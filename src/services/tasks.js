import { axiosInstance } from "../axios/instance";
import endpoints from "./endpoints";

export const createTask = (payload) =>
  axiosInstance.post(endpoints.CREATE_TASK, payload);
export const getTasks = (projectId) =>
  axiosInstance.get(endpoints.GET_TASKS(projectId));
export const deleteByTask = (id) =>
  axiosInstance.delete(endpoints.DELETE_TASK(id));
export const updateTask = (id, payload) =>
  axiosInstance.put(endpoints.UPDATE_TASK(id), payload);
