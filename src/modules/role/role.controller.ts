import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/base/controller";
import { Role, RoleDocument } from "./role.schema";
import { RoleService } from "./role.service";

@Controller('role')
@ApiTags('Role')
export class RoleController extends BaseController<RoleDocument>('role', Role) {
  constructor(private roleService: RoleService) {
    super(roleService);
  }
}
