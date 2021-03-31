import CustomError from './customError';

export class BadRequestError extends CustomError {
   status = 400;

   constructor(public message: string) {
      super(message);
      Object.setPrototypeOf(this, BadRequestError.prototype);
   }

   public serializeErrors() {
      return [this.message];
   }
}
