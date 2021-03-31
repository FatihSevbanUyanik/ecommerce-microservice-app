import CustomError from './customError';

export default class NotAuthorizedError extends CustomError {
   status = 401;

   constructor(public message: string) {
      super(message);
      Object.setPrototypeOf(this, NotAuthorizedError.prototype);
   }

   public serializeErrors() {
      return [this.message];
   }
}
