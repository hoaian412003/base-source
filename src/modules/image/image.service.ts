import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { createReadStream } from "fs";
import { Model } from "mongoose";
import { join } from "path";
import { BaseService } from "src/base/service";
import { rootPublicPath } from "src/config/environment";
import { ImageFile } from "src/decorator/image.decorator";
import { UploadImageDto } from "./dto/upload-image.dto";
import { Image, ImageDocument } from "./image.schema";

@Injectable()
export class ImageService extends BaseService<ImageDocument> {
  constructor(@InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>) {
    super(imageModel);
  }

  async uploadImage(data: UploadImageDto & { metadata: ImageFile }) {
    return this.imageModel.create(data);
  }
}
