import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/base/controller";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('User')
export class UserController extends BaseController<CreateUserDto>('user', CreateUserDto) {

  constructor(private userService: UserService) {
    super(userService as any);
  }
}
