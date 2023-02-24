import { Catch, ExceptionFilter, HttpException, InternalServerErrorException } from '@nestjs/common';

@Catch()
export class ErrorInterceptor implements ExceptionFilter {
  catch(exception: any) {
    console.log(exception);
    if (exception instanceof HttpException) {
      return exception
    } else {
      return new InternalServerErrorException(exception.message);
    }
  }
}

