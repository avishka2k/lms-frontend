import { notifyError, notifySuccess } from "../../components/notify";
import api from "./api";

export const getApplicants = async () => {
    try {
        const response = await api.get("/applicants/student");
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
};

export const getApplicantsLength = async () => {
    try {
        const response = await api.get("/applicants/student");
        return response.data.length;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const studentReq =  async (data: any) => {
    try {
        const response = await api.post("/applicants/student", data);
        notifySuccess("Application send successfully");
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}

export const getApplicantById = async (id: string) => {
    try {
        const response = await api.get(`/applicants/student/${id}`);
        return response.data;
    } catch (error: any) {
        notifyError(error.response.data);
    }
}