import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { };
