import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CreateUserDto {

  @ApiProperty({
    name: 'username',
    default: 'hoaian412003@gmail.com'
  })
  @IsString()
  username: string;

  @ApiProperty({
    name: 'password',
    default: 'strong.pass.word'
  })
  @IsString()
  password: string;
}
