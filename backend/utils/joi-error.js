import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const joiError = (res, error) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    statusCode: StatusCodes.BAD_REQUEST,
    statusMsg: ReasonPhrases.BAD_REQUEST,
    msg: error.details[0].message,
  });
};

export default joiError;
