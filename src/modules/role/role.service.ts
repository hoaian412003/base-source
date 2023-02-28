import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/base/service";
import { Role, RoleDocument } from "./role.schema";

@Injectable()
export class RoleService extends BaseService<RoleDocument> {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>) {
    super(roleModel);
    this.initRole();
  }
  async initRole() {
    const adminRole = await this.roleModel.findOne({ name: 'admin' });
    if (!adminRole) await this.roleModel.create({
      name: 'admin',
      description: 'Amind role for use all api',
      permissions: ['all']
    })
  }
}
