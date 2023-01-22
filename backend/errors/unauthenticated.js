import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import CustomAPIError from './base-error-api.js';

class UnauthenticatedError extends CustomAPIError {
  constructor(message, statusMsg) {
    super(message, statusMsg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.statusMsg = ReasonPhrases.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
