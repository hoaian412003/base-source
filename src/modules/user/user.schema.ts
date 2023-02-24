import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

  @ApiProperty({
    name: 'role',
    required: true
  })
  @IsString()
  @Prop()
  role: string;

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

