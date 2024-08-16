import { error } from "console";
import { toast } from "react-toastify";


export const notifySuccess = (msg: string) => toast.success(msg);

export const notifyError = (msg: any) => toast.error(msg);

export const notifyWarning = (msg: string) => toast.warning(msg);

export const notifyInfo = (msg: string) => toast.info(msg);