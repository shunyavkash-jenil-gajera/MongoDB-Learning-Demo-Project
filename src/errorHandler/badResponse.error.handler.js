export const badResponseErrorHandler = (res, message = "Bad Request") => {
  return res.status(400).json({
    status: "error",
    message: message,
  });
};
