import { axiosInstance } from "../axios/instance";
import endpoints from "./endpoints";

export const createproject = (payload) =>
  axiosInstance.post(endpoints.CREATE_PROJECT, payload);
export const getProjects = () => axiosInstance.get(endpoints.GET_PROJECTS);
export const deleteByProject = (id) =>
  axiosInstance.delete(endpoints.DELETE_PROJECT(id));
