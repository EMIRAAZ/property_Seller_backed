const createHttpError = require('http-errors');
const { ValidationError } = require('express-json-validator-middleware');

const defaultErrorDetails = {
  type: 'about:blank',
  status: 500,
};

const errorTypes = [
  {
    matchErrorClass: createHttpError.BadRequest,
    details: {
      message: 'User ID must be a number',
      status: 400,
    },
  },
  {
    matchErrorClass: createHttpError.Conflict,
    details: {
      status: 409,
      message: err => err.message,
    },
  },
  {
    matchErrorClass: ValidationError,
    details: {
      message: 'Invalid object in request body',
      status: 422,
    },
    occurrenceDetails(err) {
      return {
        detail: err.validationErrors,
      };
    },
  },
];

const getErrorDetails = err => {
  const errorType = errorTypes.find(
    errorTypeItem => err instanceof errorTypeItem.matchErrorClass
  );

  if (!errorType) {
    if (err.message) {
      return {
        message: err.message,
        status: err.status || 500,
      };
    }
    return defaultErrorDetails;
  }

  const errorDetails = { ...errorType.details };

  if (typeof errorType.details.message === 'function') {
    Object.assign(errorDetails, { message: err.message });
  }

  if (typeof errorType.occurrenceDetails === 'function') {
    Object.assign(errorDetails, errorType.occurrenceDetails(err));
  }

  return errorDetails;
};

const errorDetailsResponseMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const errorDetails = getErrorDetails(err);

  if (!errorDetails.status) {
    errorDetails.status = err.status || 500;
  }

  res.set('Content-Type', 'application/problem+json');

  res.status(errorDetails.status).json(errorDetails);

  next();
};

module.exports = errorDetailsResponseMiddleware;
