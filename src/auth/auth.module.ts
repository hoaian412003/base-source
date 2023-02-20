import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.schema";
import { Auth, AuthSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
        discriminators: [
          { name: User.name, schema: UserSchema }
        ]
      }
    ]),
    JwtModule
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { };
