import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "src/config/role";
import { User } from "src/user/user.schema";

export type AuthDocument = HydratedDocument<Auth>

@Schema({ discriminatorKey: 'role', collection: 'people' })
export class Auth {
  @Prop({
    type: String,
    require: true,
    enum: [User.name],
    default: User.name
  })
  role: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

