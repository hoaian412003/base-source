import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageController } from "./image.controller";
import { ImageSchema, Image } from "./image.schema";
import { ImageService } from "./image.service";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Image.name,
      schema: ImageSchema
    }])
  ],
  providers: [
    ImageService
  ],
  exports: [
    ImageService
  ],
  controllers: [
    ImageController
  ]
})
export class ImageModule {

}
