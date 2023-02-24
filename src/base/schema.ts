import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaOptions } from "mongoose";

export const BaseSchema = (options?: SchemaOptions) => {
  return <T extends { new(...args: any[]): {} }>(Class: T) => {
    @Schema({
      timestamps: true,
      toJSON: {
        getters: true,
      },
      toObject: {
        getters: true
      },
      ...options
    })
    class SchemaClass extends Class {

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
    return SchemaClass;
  }
}
