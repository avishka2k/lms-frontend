import { notifyError, notifySuccess } from "../../components/notify";
import api from "./api";

export const getApplicants = async () => {
    try {
        const response = await api.get("/applicants/student");
        return response.data;
    } catch (error: any) {
        notifyError(error);
    }
};