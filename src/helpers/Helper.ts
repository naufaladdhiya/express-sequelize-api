const ResponseData = (
  status: number,
  message: string | null,
  data: any | null,
  error: any | null
) => {
  if (error != null && error instanceof Error) {
    const response = {
      status: status,
      message: error.message,
      errors: error.stack,
      data: null,
    };

    return response;
  }

  return {
    status,
    message,
    data,
  };
};

export default { ResponseData };
