import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { LoginDto } from "src/auth/dto/login.dto";
import { Role } from "src/config/role";
import { Roles } from "src/decorator/role.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {

  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Post('/login')
  async login(@Body() data: LoginUserDto) {
    return await this.userService.login(data);
  }

  @Get('/me')
  @Roles(Role.USER)
  async getMe(@Request() request) {
    return request.person;
  }
}
