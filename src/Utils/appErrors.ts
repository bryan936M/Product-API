export const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
};

export class customError extends Error {
    protected errorName: string;
    protected statusCode: number;

    constructor(name: string, description: string, statusCode: number) {
        super(description);
        this.errorName = name;
        this.statusCode = statusCode;
    }
}

// This is for the errors that are validation errors
export class ValidationError extends customError {
    constructor(description: string) {
        super("ValidationError", description, STATUS_CODES.BAD_REQUEST);
    }
}

// This for the errors that are caused by the user
export class BadRequestError extends customError {
    constructor(description: string) {
        super("BadRequestError", description, STATUS_CODES.BAD_REQUEST);
    }
}

// This is for the errors that are not handled by the application
export class APIError extends customError {
    constructor(description: string) {
        super('APIError', description, STATUS_CODES.INTERNAL_ERROR)
    }
}
