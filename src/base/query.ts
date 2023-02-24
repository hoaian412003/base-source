import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export type BaseQueryType = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortDirection?: string;
}

export class BaseQueryDto {

  @ApiProperty({
    name: 'limit',
    description: 'Limit of this query',
    required: false,
    default: 10,
    type: Number
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({
    name: 'page',
    description: 'Page for this query',
    default: 1,
    required: false
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    name: 'sortBy',
    description: 'Fields wants to sort for this query, if many fields write it with command Example: name,email',
    default: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  sortBy: string;

  @ApiProperty({
    name: 'sortDirection',
    description: 'What direction you want to sort contains 1 or -1 with 1 is ascending, -1 is descending Example: -1,1',
    default: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  sortDirection: string;

}
