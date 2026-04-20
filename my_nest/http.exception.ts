export enum HttpStatus {
    INTERAL_SERVER_ERROR = 500,
    NOT_FOUND_ERROR = 404
}

export class HttpException extends Error{
    message: string;
    constructor( message: string, private status: HttpStatus, cause?: {}) {
        super();
        this.message = message;
        this.status = status;
        if (cause) {
            this.cause = cause;
        }
    }
}
