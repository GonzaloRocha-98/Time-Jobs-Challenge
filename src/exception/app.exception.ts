import { HttpException, HttpStatus } from "@nestjs/common";

export class AppException extends HttpException {
    constructor(message:string, status: HttpStatus, data:any[] = [] ) {
      super(message, status);
      data;
    }
  }