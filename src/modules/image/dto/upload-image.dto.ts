import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UploadImageDto {
  @ApiProperty({
    name: 'image',
    description: 'Chose file for upload',
    format: 'binary'
  })
  image: string;

  @ApiProperty({
    name: '',
    required: false
  })
  @IsString()
  description: string;
}

