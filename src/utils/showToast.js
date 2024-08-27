import { toast } from "react-toastify";

export const showToast = (msg) => {
  toast.success(msg, { position: "bottom-right" });
};

export const showErrorToast = (msg) => {
  toast.error(msg, { position: "bottom-right" });
};

export const showInfoToast = (msg) => {
  toast.info(msg, { position: "bottom-right" });
};

export const showWarningToast = (msg) => {
  toast.warn(msg, { position: "bottom-right" });
};
