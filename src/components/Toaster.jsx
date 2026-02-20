import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

export const successToast = () => {
  toast.success("Data sent successfully");
};
export const errorToast = () => {
  toast.error("Data not Fetch");
};

export const editToast = () => {
  toast.success("Date Updated successfully");
};

const Toaster = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default Toaster;
