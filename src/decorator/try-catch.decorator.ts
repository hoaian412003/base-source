import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';

export const TryCatch = (): MethodDecorator => {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error.status) throw error;
        throw new InternalServerErrorException(error.message);
      }
    };

    return descriptor;
  };
};
