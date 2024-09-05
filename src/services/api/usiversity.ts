import { notifyError, notifySuccess } from "../../components/notify";
import api from "./api";
import apiPublic from "./api-public";

export const getFaculties = async () => {
  try {
    const response = await api.get("/uni/faculty");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const createFaculty = async (data: any) => {
  try {
    const response = await api.post("/uni/faculty", data);
    notifySuccess("Faculty created successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const getFacultyById = async (id: string) => {
  try {
    const response = await api.get(`/uni/faculty/${id}`);
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const updateFaculty = async (id: string, data: any) => {
  try {
    const response = await api.put(`/uni/faculty/${id}/update`, data);
    notifySuccess("Faculty updated successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const deleteFaculty = async (id: string) => {
  try {
    const response = await api.delete(`/uni/faculty/${id}/delete`);
    notifySuccess("Faculty deleted successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const getDepartments = async () => {
  try {
    const response = await api.get("/uni/department");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const getDepartmentsWithoutAssigned = async () => {
  try {
    const response = await api.get("/uni/department/unassigned");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const getDepartmentById = async (id: string) => {
  try {
    const response = await api.get(`/uni/department/${id}`);
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const createDepartment = async (data: any) => {
  try {
    const response = await api.post("/uni/department", data);
    notifySuccess("Department created successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const updateDepartment = async (id: string, data: any) => {
  try {
    const response = await api.put(`/uni/department/${id}`, data);
    notifySuccess("Department updated successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const deleteDepartment = async (id: string) => {
  try {
    const response = await api.delete(`/uni/department/${id}/delete`);
    notifySuccess("Department deleted successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const getDepartmentsByFacultyId = async (id: string) => {
  try {
    const response = await api.get(`/uni/faculty/${id}/departments`);
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const unassignDepartmentFromFaculty = async (departmentId: string) => {
  try {
    const response = await api.delete(
      `/uni/department/${departmentId}/unassign`
    );
    notifySuccess("Department unassigned successfully");
    return response;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const assignDepartmentToFaculty = async (
  facultyId: string,
  departmentId: string
) => {
  const response = await api.post(
    `/uni/faculty/${facultyId}/department/${departmentId}`
  );
  return response.data;
};

export const getPublicDepartment = async () => {
  try {
    const response = await apiPublic.get("/public/uni/departments");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

