export const ERROR_CODE = {
  SUCCESS: {
    error_code: 'SUCCESS',
    message: 'Success',
  },
  UNKNOWN: {
    error_code: 'UNKNOWN',
    message: 'unknown',
  },
  BAD_REQUEST: {
    error_code: 'BAD_REQUEST',
    message: 'Bad Request',
  },
  NOT_FOUND: {
    error_code: 'NOT_FOUND',
    message: 'Not Found',
  },
  EXISTED: {
    error_code: 'EXISTED',
    message: 'Existed',
  },
  INVALID: {
    error_code: 'INVALID',
    message: 'Invalid',
  },
  INCORRECT: {
    error_code: 'INCORRECT',
    message: 'Incorrect',
  },
  UNAUTHORIZED: {
    error_code: 'UNAUTHORIZED',
    message: 'Unauthorized',
  },
  ACCESS_DENIED: {
    error_code: 'ACCESS_DENIED',
    message: 'Access denied',
  },
  NOT_VERIFIED: {
    error_code: 'NOT_VERIFIED',
    message: 'Not verified',
  },
  EXPIRED: {
    error_code: 'EXPIRED',
    message: 'Expired',
  },
  UNPROCESSABLE: {
    error_code: 'UNPROCESSABLE',
    message: 'Unprocessable',
  },
};

export enum BAD_REQUEST_CODE {
  BAD_REQUEST = 'BAD_REQUEST',
  EXISTED = 'EXISTED',
  INVALID = 'INVALID',
  INCORRECT = 'INCORRECT',
  EXPIRED = 'EXPIRED',
}
export enum UNAUTHORIZED_CODE {
  UNAUTHORIZED = 'UNAUTHORIZED',
  EXPIRED = 'EXPIRED',
}
