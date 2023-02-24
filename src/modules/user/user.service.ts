import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/base/service";
import { Messages } from "src/config/messages";
import { encryptPassword } from "src/utils/bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async create(data: CreateUserDto) {
    const alreadyUser = await this.userModel.findOne({ username: data.username, role: User.name });
    if (alreadyUser) throw new BadRequestException(Messages.USERNAME_USED);
    data.password = encryptPassword(data.password);
    const user = new this.userModel(data);
    return user.save();
  }
}
