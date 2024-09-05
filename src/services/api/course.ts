import {notifyError, notifySuccess} from "../../components/notify";
import api from "./api";
import apiPublic from "./api-public";

export const getCourses = async () => {
    try {
        const response = await api.get("/course");
        return response.data;
    } catch (error: any) {
        notifyError(error);
    }
}

// Create a new course
export const createCourse = async (courseData: any) => {
    try {
        const response = await api.post("/course", courseData);
        notifySuccess("Course created successfully");
        return response;
    } catch (error: any) {
        notifyError(error.response.data);
    }
};

// Get course by ID
export const getCourseById = async (id: string) => {
    try {
        const response = await api.get(`/course/${id}`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
};

export const getCourseNameById = async (id: string) => {
    try {
        const response = await api.get(`/course/name/${id}`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

// Update a course
export const updateCourse = async (id: string, courseData: any) => {
    try {
        const response = await api.put(`/course/${id}`, courseData);
        notifySuccess("Course updated successfully");
        return response;
    } catch (error: any) {
        notifyError(error.response.data);
    }
};

// Delete a course
export const deleteCourse = async (id: string) => {
    try {
        const response = await api.delete(`/course/${id}`);
        notifySuccess("Course deleted successfully");
        return response;
    } catch (error: any) {
        notifyError(error.response.data);
    }
};

export const assignModuleToCourse = async (courseId: string, moduleId: string) => {
    try {
        const response = await api.post(`/course/assign/${moduleId}/${courseId}`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getModulesByCourseId = async (courseId: string) => {
    try {
        const response = await api.get(`/course/module/${courseId}/course`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getModulesByCourseIdForStudent = async (courseId: string) => {
    try {
        const response = await api.get(`/studentcourse/module/${courseId}/course`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getModulesByCourseIdForLecturer = async (courseId: string) => {
    try {
        const response = await api.get(`/lecturercourse/module/${courseId}/course`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getModulesWithoutAssigned = async () => {
    try {
        const response = await api.get(`/course/module/unassigned`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const unassignModuleFromCourse = async (moduleId: string) => {
    try {
        const response = await api.delete(`/course/unassign/${moduleId}`);
        notifySuccess("Course unassigned successfully");
        return response;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const assignCourseToDepartment = async (departmentId: string, courseId: string) => {
    const response = await api.post(`/uni/department/${departmentId}/course/${courseId}`);
    return response.data;
}

export const getCoursesByDepartmentId = async (id: string) => {
    try {
        const response = await api.get(`/course/department/${id}`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getCoursesWithoutAssigned = async () => {
    try {
        const response = await api.get(`/course/unassigned`);
        return response.data;
    } catch (error: any) {
        notifyError(error);
    }
}

// export const unassignCourseFromDepartment = async (courseId: string) => {
//     try {
//         const response = await api.delete(`/course/unassign/${courseId}/department`);
//         notifySuccess("Department unassigned successfully");
//         return response;
//     } catch (error: any) {
//         notifyError(error.response.data);
//     }
// }

export const unassignCourseFromDepartment = async (departmentId: string, courseId: string) => {
    try {
        const response = await api.delete(`/uni/department/${departmentId}/course/${courseId}`);
        notifySuccess("Course unassigned successfully");
        return response;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

// export const getPublicCourses = async () => {
//     try {
//         const response = await apiPublic.get("public/courses");
//         return response.data;
//     } catch (error: any) {
//         notifyError(error);
//     }
// }

export const getPublicCourses = async (departmentId: string) => {
    try {
        const response = await apiPublic.get(`public/courses/department/${departmentId}`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getModules = async () => {
    try {
        const response = await api.get("/course/module");
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const createModule = async (moduleData: any) => {
    try {
        const response = await api.post("/course/module", moduleData);
        notifySuccess("Module created successfully");
        return response;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const updateModule = async (id: string, data: any) => {
    try {
        const response = await api.put(`/course/module/${id}`, data);
        notifySuccess("Module updated successfully");
        return response;
    } catch (error: any) {
        notifyError(error.response.data);
    }
};

export const getModuleById = async (id: string) => {
    try {
        const response = await api.get(`/course/module/${id}`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
};

export const deleteModule = async (id: string) => {
    try {
        const response = await api.delete(`/course/module/${id}`);
        notifySuccess("Module deleted successfully");
        return response;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}