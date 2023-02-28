import { applyDecorators, ArgumentMetadata, BadRequestException, Injectable, PipeTransform, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"
import { ApiConsumes } from "@nestjs/swagger"
import { diskStorage } from "multer"
import { rootPublicPath } from "src/config/environment"

export const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webpg']

export type ImageOptions = {
  fieldName: string,
  path: string
}

export const ImageInterceptor = (options: ImageOptions) => {

  const destination = `${rootPublicPath}/images/${options.path}`

  const multerOptions: MulterOptions = {
    storage: diskStorage({
      destination,
    })
  }

  return applyDecorators(UseInterceptors(FileInterceptor(options.fieldName, multerOptions)), ApiConsumes('multipart/form-data'));
}

export const ImagesInterceptor = (fieldName: string) => {
  return applyDecorators(ApiConsumes('multipart/form-data'), UseInterceptors(FilesInterceptor(fieldName)));
}

export const UploadedImage = () => {
  return UploadedFile(ImageTypeValidator);
}

export type ImageFile = Express.Multer.File;

@Injectable()
export class ImageTypeValidator implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!validImageTypes.includes(value.mimetype)) {
      throw new BadRequestException('Invalid image file type');
    }
    return value;
  }
}
