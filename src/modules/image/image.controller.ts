import { Body, Controller, Param, Res, StreamableFile } from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import { DefaultGet, DefaultPost } from "src/base/controller";
import { rootPublicPath } from "src/config/environment";
import { ImageFile, ImageInterceptor, UploadedImage } from "src/decorator/image.decorator";
import { Permission } from "src/decorator/role.decorator";
import { UploadImageDto } from "./dto/upload-image.dto";
import { ImageService } from "./image.service";

@Controller('image')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {

  }

  @DefaultPost('/')
  @ImageInterceptor({ fieldName: 'image', path: '' })
  @ApiBody({
    type: UploadImageDto
  })
  @Permission('upload_image')
  async create(@UploadedImage() image: ImageFile, @Body() data: UploadImageDto) {
    return await this.imageService.uploadImage({ metadata: image, ...data })
  }

  @DefaultGet('/:imageId')
  @ApiParam({
    name: 'imageId',
    required: true
  })
  @Permission('view_one_image')
  async view(@Param() { imageId }, @Res({ passthrough: true }) res: Response) {
    const image = await this.imageService.getOne({
      _id: imageId
    })

    const stream = createReadStream(join(rootPublicPath, '/images/', image.metadata.filename));
    res.set({
      'Content-Disposition': `inline; filename="${image.metadata.filename}"`,
      'Content-Type': image.metadata.mimetype
    })
    return new StreamableFile(stream);
  }
}

