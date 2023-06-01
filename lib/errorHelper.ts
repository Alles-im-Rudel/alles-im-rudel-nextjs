import { UseFormSetError } from "react-hook-form";

export const handleBackendError = (
  error: any,
  setError: UseFormSetError<any>
) => {
  error?.response?.data?.errors &&
    Object.keys(error.response.data.errors).forEach((key) => {
      setError(key, {
        type: "custom",
        message: error.response.data.errors[key][0],
      });
    });
};
