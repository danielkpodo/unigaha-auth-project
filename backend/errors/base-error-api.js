class CustomAPIError extends Error {
  constructor(message, statusMsg) {
    super(message, statusMsg);
  }
}

export default CustomAPIError;
