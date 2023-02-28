import { BaseSchema } from "src/base/schema";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ImageFile } from "src/decorator/image.decorator";

export type ImageDocument = Image & Document;

@Schema({
  timestamps: true,
  toObject: {
    getters: true
  },
  toJSON: {
    getters: true
  }
})
export class Image extends BaseSchema {

  @Prop({
    required: true,
    type: {}
  })
  metadata: ImageFile

  @Prop({ required: false })
  description?: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);

ImageSchema.virtual('linkDownload').get(function(this: ImageDocument) {
  return process.env.BASE_IMAGE_URL + this?.metadata?.filename;
})
