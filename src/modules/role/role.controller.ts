import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/base/controller";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleDocument } from "./role.schema";
import { RoleService } from "./role.service";

@Controller('role')
@ApiTags('Role')
export class RoleController extends BaseController<RoleDocument>({
  route: 'role',
  CreateDto: CreateRoleDto,
  UpdateDto: UpdateRoleDto
}) {
  constructor(private roleService: RoleService) {
    super(roleService);
  }
}
