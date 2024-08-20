import { notifyError, notifySuccess } from "../../components/notify";
import api from "./api";

export const getAllAnnouncements = async () => {
  try {
    const response = await api.get("/announcement/all");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const createAssignment = async (data: any) => {
  try {
    const response = await api.post("/announcement/assignment", data);
    notifySuccess("Announcement created successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const createExam = async (data: any) => {
  try {
    const response = await api.post("/announcement/exam", data);
    notifySuccess("Announcement created successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const createEvent = async (data: any) => {
  try {
    const response = await api.post("/announcement/event", data);
    notifySuccess("Announcement created successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const createMaintenance = async (data: any) => {
  try {
    const response = await api.post("/announcement/maintenance", data);
    notifySuccess("Announcement created successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const deleteAnnouncement = async (id: string) => {
  try {
    const response = await api.delete(`/announcement/${id}`);
    notifySuccess("Announcement deleted successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};
