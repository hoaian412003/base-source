import { BadRequestException, Injectable } from "@nestjs/common";
import { MESSAGES } from "@nestjs/core/constants";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { compare } from "bcrypt";
import { Model } from "mongoose";
import { BaseService } from "src/base/service";
import { Messages } from "src/config/messages";
import { encryptPassword } from "src/utils/bcrypt";
import { Role } from "../role/role.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    super(userModel);
  }

  async register(data: CreateUserDto) {
    const alreadyUser = await this.userModel.findOne({ username: data.username, role: User.name });
    if (alreadyUser) throw new BadRequestException(Messages.USERNAME_USED);
    data.password = encryptPassword(data.password);
    const user = new this.userModel(data);
    return user.save();
  }

  async login(data: LoginUserDto) {
    let user: UserDocument & { permissions: Array<string> } = await this.userModel.findOne({ username: data.username })
    if (!user || !compare(data.password, user.password)) {
      throw new BadRequestException(Messages.FIELD_INVALID('Username', 'password'));
    }
    user = user.toObject() as any;
    user.roles.map((role: Role) => {
      user.permissions = [...(user.permissions || []), ...role.permissions]
    });
    delete user.roles;
    delete user.password;
    const accessToken = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET
    });
    return {
      user,
      accessToken
    }
  }
}
