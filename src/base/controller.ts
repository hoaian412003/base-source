import { applyDecorators, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiParam } from "@nestjs/swagger"
import { Permission } from "src/decorator/role.decorator"
import { TryCatch } from "src/decorator/try-catch.decorator"
import { BaseQueryDto } from "./query"
import { BaseService } from "./service"

export type ControllerConfig = {
  route: string;
  CreateDto?: any;
  UpdateDto?: any;
  QueryDto?: any;
}

export const DefaultPost = (route: string) => {
  return applyDecorators(
    TryCatch,
    Post(route),
    ApiBearerAuth(),
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
    ApiBearerAuth(),
    Put(route),
  )
}

export const DefaultDelete = (route: string) => {
  return applyDecorators(
    TryCatch,
    ApiBearerAuth(),
    Delete(route),
  )
}


export const BaseController = <T>({ route, CreateDto, UpdateDto, QueryDto = {} }: ControllerConfig) => {

  const selfParam: string = route + "Id";

  const writePermission = `write_${route.toLowerCase()}`;
  const viewOnePermission = `view_one_${route.toLowerCase()}`;
  const viewAllPermission = `view_all_${route.toLowerCase()}`;
  const editPermission = `edit_${route.toLowerCase()}`;
  const removePermission = `remove_${route.toLowerCase()}`;

  @Controller(route)
  abstract class BaseControllerClass {
    constructor(public readonly service: BaseService<T>) { }

    @DefaultPost('')
    @Permission(writePermission)
    @ApiBody({
      type: CreateDto
    })
    async create(@Body() data: any) {
      return await this.service.createOne(data);
    }

    @DefaultGet('')
    @Permission(viewAllPermission)
    async getAll(@Query() query: BaseQueryDto) {
      return await this.service.getAll({}, query);
    }

    @DefaultGet(`:${selfParam}`)
    @Permission(viewOnePermission)
    @ApiParam({
      name: selfParam,
      required: true
    })
    async getOne(@Param() params: any) {
      return await this.service.getOne({ _id: params[selfParam] });
    }

    @DefaultPut(`:${selfParam}`)
    @Permission(editPermission)
    @ApiParam({
      name: selfParam,
      required: true
    })
    @ApiBody({
      type: UpdateDto
    })
    async updateOne(@Param() params: any, @Body() data: T) {
      return this.service.updateOne({ _id: params[selfParam] }, data)
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

