import { toast } from "react-toastify";

const successToast = (message) => {
  return toast.success(`${message}`, {
    position: "top-center",
    className: "success",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const errorToast = (message) => {
  return toast.error(`${message}`, {
    position: "top-center",
    autoClose: 2000,
    className: "error",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export { successToast, errorToast };
