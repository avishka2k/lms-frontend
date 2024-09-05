import {notifyError, notifySuccess} from "../../components/notify";
import api from "./api";


export const getAdmins = async () => {
    try {
        const response = await api.get("/user/admin/getAdmins");
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getUserDetails = async () => {
  try {
    const response = await api.get("/user/admin/userInfo");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const getStudentDetailsByUsername = async (username: string) => {
    try {
        const response = await api.get(`/user/student/${username}/username`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getLecturerDetailsByUsername = async (username: string) => {
  try {
    const response = await api.get(`/user/lecturer/${username}/username`);
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
}


export const getStudents = async () => {
  try {
    const response = await api.get("/user/admin/students");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const getLecturers = async () => {
  try {
    const response = await api.get("/user/admin/lecturers");
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const deleteLecturer = async (username: string) => {
    try {
        const response = await api.delete(`/user/admin/deleteUser/${username}`);
        return response.data;
    } catch (error: any) {
        notifyError(error);
    }
}

export const getUser = async (username: string) => {
  try {
    const response = await api.get(`/user/admin/getUser/${username}`);
    return response.data;
  } catch (error: any) {
    notifyError(error);
  }
};

export const createStudent = async (userData: any) => {
  try {
    const response = await api.post("/user/admin/students", userData);
    notifySuccess("Student created successfully");
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const createLecturer = async (userData: any) => {
  try {
    const response = await api.post("/user/admin/lecturers", userData);
    notifySuccess("Lecturer created successfully");
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const updateUser = async (username: string, attributes: any) => {
  try {
    const response = await api.put(`/user/admin/updateUser/${username}`, attributes);
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const deleteUser = async (username: string) => {
  try {
    const response = await api.delete(`/user/admin/deleteUser/${username}`);
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};

export const deleteStudent = async (username: string) => {
  try {
    const response = await api.delete(`/user/admin/deleteUser/${username}`);
    return response.data;
  } catch (error: any) {
    notifyError(error.response.data);
  }
};
