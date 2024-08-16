import { notifyError } from "../../components/notify";
import api from "./api";

export const getUserDetails = async () => {
  try {
    const response = await api.get("/admin/userInfo");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get("/admin/getStudents");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const getLecturers = async () => {
  try {
    const response = await api.get("/admin/getLecturers");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const getUser = async (username: string) => {
  try {
    const response = await api.get(`/admin/getUser/${username}`);
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const createStudent = async (userData: any) => {
  try {
    const response = await api.post("/admin/createStudent", userData);
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const createLecturer = async (userData: any) => {
  try {
    const response = await api.post("/admin/createLecturer", userData);
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const updateUser = async (username: string, attributes: any) => {
  try {
    const response = await api.put(`/admin/updateUser/${username}`, attributes);
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const deleteUser = async (username: string) => {
  try {
    const response = await api.delete(`/admin/deleteUser/${username}`);
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};
