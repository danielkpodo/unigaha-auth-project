import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import CustomAPIError from './base-error-api.js';

class BadRequestError extends CustomAPIError {
  constructor(message, statusMsg) {
    super(message, statusMsg);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.statusMsg = ReasonPhrases.BAD_REQUEST;
  }
}

export default BadRequestError;
