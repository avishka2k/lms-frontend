import { notifyError } from "../../components/notify";
import api from "./api";

// Create a new course
export const createCourse = async (courseData: any) => {
    try {
        const response = await api.post("/api/courses", courseData);
        return response.data;
    } catch (error: any) {
        notifyError(error);
        throw error;
    }
};

// Get course by ID
export const getCourseById = async (id: number) => {
    try {
        const response = await api.get(`/api/courses/${id}`);
        return response.data;
    } catch (error: any) {
        notifyError(error);
        throw error;
    }
};

// Update a course
export const updateCourse = async (id: number, courseData: any) => {
    try {
        const response = await api.put(`/api/courses/${id}`, courseData);
        return response.data;
    } catch (error: any) {
        notifyError(error);
        throw error;
    }
};

// Delete a course
export const deleteCourse = async (id: number) => {
    try {
        const response = await api.delete(`/api/courses/${id}`);
        return response.data;
    } catch (error: any) {
        notifyError(error);
        throw error;
    }
};

// Get all courses
export const getAllCourses = async () => {
    try {
        const response = await api.get("/api/courses");
        return response.data;
    } catch (error: any) {
        notifyError(error);
        throw error;
    }
};
