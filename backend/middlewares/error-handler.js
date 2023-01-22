import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    statusMsg: err.statusMsg || ReasonPhrases.INTERNAL_SERVER_ERROR,
    msg:
      err.message || 'Oops! An error occurred whilst processing your request',
  };

  if (err.name === 'SyntaxError') {
    defaultError.statusMsg = ReasonPhrases.BAD_REQUEST;
    defaultError.statusCode = 400;
  }

  /** Handling database validation error */
  if (err.name === 'ValidationError') {
    defaultError.msg = Object.values(err.errors)
      .map(item => item.message)
      .join(',');
    defaultError.statusCode = 400;
  }

  /** Handle duplicate error */
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.msg = `${Object.keys(err.keyValue)} field must be unique`;
  }

  /** Return only one error @time */
  const errors = defaultError.msg.split(',');
  errors.map(error => {
    if (error) {
      return res.status(defaultError.statusCode).json({
        statusCode: defaultError.statusCode,
        statusMsg: defaultError.statusMsg,
        msg: error,
      });
    }
  });
};

export default errorHandlerMiddleware;
