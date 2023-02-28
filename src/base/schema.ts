import { applyDecorators } from "@nestjs/common";
import { Prop, Schema } from "@nestjs/mongoose";

export const DefaultSchema = () => {
  return applyDecorators(Schema({
    timestamps: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true
    },
  }))
}

export class BaseSchema {
  @Prop({
    default: false
  })
  isDeleted: boolean

  @Prop({
    required: false,
    default: 'null'
  })
  createdBy: string;

  @Prop({
    required: false,
    default: 'null'
  })
  updatedBy: string;
}
