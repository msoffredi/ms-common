import { CustomError } from './custom-error';
import { ErrorEntry } from './types';

export class EventError extends CustomError {
    statusCode = 422;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, EventError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message } as ErrorEntry];
    }
}
