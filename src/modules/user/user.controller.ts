import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController, DefaultPost } from "src/base/controller";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User, UserDocument } from "./user.schema";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('User')
export class UserController extends BaseController<UserDocument>('user', User) {

  constructor(private userService: UserService) {
    super(userService);
  }

  @DefaultPost('register')
  async registerUser(@Body() data: User) {
    return await this.userService.register(data);
  }

  @DefaultPost('login')
  async loginUser(@Body() data: LoginUserDto) {
    return await this.userService.login(data);
  }
}
