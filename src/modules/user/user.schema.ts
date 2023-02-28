import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
import { BaseSchema, DefaultSchema } from "src/base/schema";
import { Role } from "../role/role.schema";

export type UserDocument = HydratedDocument<User>

@DefaultSchema()
export class User extends BaseSchema {

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: Role.name,
    autopopulate: true
  })
  roles: Array<Role>;

  @ApiProperty({
    name: 'username',
    required: true
  })
  @IsString()
  @Prop()
  username: string;

  @ApiProperty({
    name: 'password',
    required: true
  })
  @IsString()
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

