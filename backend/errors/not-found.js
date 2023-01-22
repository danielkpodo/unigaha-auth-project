import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import CustomAPIError from './base-error-api.js';

class NotFoundError extends CustomAPIError {
  constructor(message, statusMsg) {
    super(message, statusMsg);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.statusMsg = ReasonPhrases.NOT_FOUND;
  }
}

export default NotFoundError;
