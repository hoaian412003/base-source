import { applyDecorators, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiParam, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger"
import { BaseDocumentType } from "mongoose"
import { Role } from "src/config/role"
import { Permission, Roles } from "src/decorator/role.decorator"
import { TryCatch } from "src/decorator/try-catch.decorator"
import { CreateUserDto } from '../modules/user/dto/create-user.dto'
import { BaseQueryDto } from "./query"
import { BaseService } from "./service"

export const DefaultPost = (route: string) => {
  return applyDecorators(
    TryCatch,
    Post(route),
    ApiBearerAuth,
  )
}

export const DefaultGet = (route: string) => {
  return applyDecorators(
    TryCatch,
    ApiBearerAuth(),
    Get(route),
  )
}

export const DefaultPut = (route: string) => {
  return applyDecorators(
    TryCatch,
    ApiBearerAuth,
    Put(route),
  )
}

export const DefaultDelete = (route: string) => {
  return applyDecorators(
    TryCatch,
    ApiBearerAuth,
    Delete(route),
  )
}


export const BaseController = <T>(route: string, Dto: any) => {

  const selfParam = ':' + route + "Id";

  const writePermission = `write_${route.toLowerCase()}`;
  const viewPermission = `view_${route.toLowerCase()}`;
  const editPermission = `edit_${route.toLowerCase()}`;
  const removePermission = `remove_${route.toLowerCase()}`;

  @Controller(route)
  abstract class BaseControllerClass {
    constructor(public readonly service: BaseService<T>) { }

    @DefaultPost('')
    @Permission(writePermission)
    @ApiBody({
      type: Dto
    })
    async create(@Body() data: T) {
      return await this.service.createOne(data);
    }

    @DefaultGet(selfParam)
    @Permission(viewPermission)
    @ApiParam({
      name: selfParam,
      required: true
    })
    async getOne(@Param() params: any) {
      return this.service.getOne(params);
    }

    @DefaultGet('/all')
    @Permission(viewPermission)
    @ApiQuery({
      type: BaseQueryDto
    })
    async getAll(@Query() query: BaseQueryDto) {
      console.log(query);
      return await this.service.getAll({}, query);
    }

    @DefaultPut(selfParam)
    @Permission(editPermission)
    @ApiParam({
      name: selfParam,
      required: true
    })
    async updateOne(@Param() params: any, @Body() data: T) {
      return this.service.updateOne(params, data)
    }

    @DefaultDelete('soft/' + selfParam)
    @Permission(removePermission)
    @ApiParam({
      name: selfParam,
      required: true
    })
    async deleteSoft(@Param() params: any) {
      return this.service.softDeleteOne(params);
    }

    @DefaultDelete('hard/' + selfParam)
    @Permission(removePermission)
    @ApiParam({
      name: selfParam,
      required: true
    })
    async deleteHard(@Param() params: any) {
      return this.service.hardDeleteOne(params);
    }

    @DefaultPut('undo/' + selfParam)
    @Permission(editPermission)
    @ApiParam({
      name: selfParam,
      required: true
    })
    async undoDeleted(@Param() params: any) {
      return this.service.undoDelete(params);
    }
  }

  return BaseControllerClass
}

