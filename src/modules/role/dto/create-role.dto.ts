import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    name: 'name',
    required: true
  })
  @IsString()
  name: string;


  @ApiProperty({
    name: 'description',
    required: false
  })
  @IsString()
  @IsOptional()
  description: string;
}
