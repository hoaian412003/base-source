import { BadRequestException, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Messages } from "src/config/messages";
import { encryptPassword } from "src/utils/bcrypt";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "./user.schema";

@Injectable()
export class UserService {
  private userModel: Model<User>;
  constructor(private authService: AuthService) {
    this.userModel = this.authService.userModel;
  }

  async create(data: CreateUserDto) {
    const alreadyUser = await this.userModel.findOne({ username: data.username, role: User.name });
    if (alreadyUser) throw new BadRequestException(Messages.USERNAME_USED);
    data.password = encryptPassword(data.password);
    const user = new this.userModel(data);
    return user.save();
  }

  async login(data: LoginUserDto) {
    return this.authService.login({ ...data, role: User.name });
  }
}
