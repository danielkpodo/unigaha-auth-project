import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const notFoundMiddleware = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    statusMsg: ReasonPhrases.NOT_FOUND,
    msg: `Endpoint '${req.url}' does not exist`,
  });
};

export default notFoundMiddleware;
