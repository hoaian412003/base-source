import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
  @ApiProperty({
    name: 'name',
    description: 'name of role'
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    name: 'permissions',
    description: 'permission of role',
    isArray: true
  })
  @IsArray()
  @IsOptional()
  permissons: string;

}
