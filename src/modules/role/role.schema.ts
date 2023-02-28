import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema, DefaultSchema } from "src/base/schema";

export type RoleDocument = Role & Document;

@DefaultSchema()
export class Role extends BaseSchema {
  @Prop({
    required: true
  })
  name: string;

  @Prop({
    required: false
  })
  description?: string;

  @Prop({
    required: true,
    default: []
  })
  permissions: []
}

export const RoleSchema = SchemaFactory.createForClass(Role);
