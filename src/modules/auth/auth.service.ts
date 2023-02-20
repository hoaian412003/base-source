import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Messages } from "src/config/messages";
import { comparePassword } from "src/utils/bcrypt";
import { User, UserDocument } from "../user/user.schema";
import { Auth, AuthDocument } from "./auth.schema";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>, private jwtService: JwtService,
    @InjectModel(User.name) public userModel: Model<UserDocument>) {
  }

  async login(data: LoginDto) {
    const user = await this.authModel.findOne({ username: data.username, role: data.role });
    if (!user || !comparePassword(data.password, user.password)) {
      throw new BadRequestException(Messages.USERNAME_PASSWORD_INVALID);
    }
    const personInfo = user;
    const accessToken = this.jwtService.sign(personInfo.toObject(), {
      secret: process.env.JWT_SECRET,
    });
    return {
      [data.role]: personInfo, accessToken
    }
  }
}
