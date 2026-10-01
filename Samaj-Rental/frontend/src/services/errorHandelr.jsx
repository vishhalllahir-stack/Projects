export const getErrorMessage = (
  error,
  defaultMessage = "Something went wrong"
) => {

  // Backend response received
  if (error.response) {

    const status =
      error.response.status;

    const serverMessage =
      error.response.data?.message;


    if (serverMessage) {
      return serverMessage;
    }


    if (status === 400) {
      return "Invalid request";
    }


    if (status === 401) {
      return "Please login again";
    }


    if (status === 403) {
      return "You are not allowed to perform this action";
    }


    if (status === 404) {
      return "Requested data was not found";
    }


    if (status === 409) {
      return "This data already exists";
    }


    if (status >= 500) {
      return "Server error. Please try again later";
    }
  }


  // Backend not reachable
  if (error.request) {
    return "Server is not reachable. Please check the backend.";
  }


  // Unknown error
  return (
    error.message ||
    defaultMessage
  );
};