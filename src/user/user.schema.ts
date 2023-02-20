import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  role: string;
  username: string;
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

