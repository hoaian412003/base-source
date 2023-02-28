import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "./role.controller";
import { Role, RoleSchema } from "./role.schema";
import { RoleService } from "./role.service";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Role.name,
      schema: RoleSchema
    }])
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule { }
