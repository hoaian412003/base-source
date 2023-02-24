import { FilterQuery, Model, QueryOptions } from "mongoose";
import { BaseQueryDto } from "./query";

export class BaseService<T extends any> {
  constructor(private readonly model: Model<T>) { }

  // NOTE: Create
  async createOne<CreateDto extends any>(data: CreateDto): Promise<T> {
    // INFO: Create one data
    return this.model.create(data);
  }

  async createBulk<CreateDto extends Array<T>>(data: CreateDto): Promise<Array<T>> {
    // INFO: Create many data
    return this.model.insertMany(data);
  }


  // NOTE: Get
  async getOne(filter: FilterQuery<T>, options?: QueryOptions<T>) {
    // INFO: Get One
    return this.model.findOne({ isDeleted: false, ...filter }, options);
  }
  async getAll(filter: FilterQuery<T>, options?: BaseQueryDto) {
    // INFO: Get All
    let result = this.model.find({ isDeleted: false, ...filter });
    let total = await this.model.count(filter);
    const limit = options.limit || 10;
    const skip = (options.page - 1) * limit || 0;
    const sortBys = options.sortBy.split(',');
    const sortDirections = options.sortDirection.split(',').map(Number);
    result.limit(limit);
    result.skip(skip);
    sortBys.map((sortBy: string, index: number) => {
      if (index >= sortDirections.length) return;
      const sortDirection = sortDirections[index] === 1 ? 1 : -1;
      result.sort({
        [sortBy]: sortDirection
      })
    })
    return { result, total };
  }

  // NOTE: Update
  async updateOne<UpdateDto extends T>(filter: FilterQuery<T>, data: UpdateDto) {
    // INFO: Update one
    return this.model.updateOne({ isDeleted: false, ...filter }, data);
  }

  async updateBulk<UpdateDto extends T>(filter: FilterQuery<T>, data: UpdateDto) {
    // INFO: Update many
    return this.model.updateMany({ isDeleted: false, ...filter }, data)
  }

  // NOTE: Delete 
  async softDeleteOne(filter: FilterQuery<T>) {
    // INFO: Soft delete one
    return this.model.updateOne(filter, {
      isDeleted: true
    })
  }
  async softDeleteMany(filter: FilterQuery<T>) {
    // INFO: Soft delete many
    return this.model.updateMany(filter, {
      isDeleted: true
    })
  }
  async undoDelete(filter: FilterQuery<T>) {
    // Recover data when soft delete
    return this.model.updateMany(filter, {
      isDeleted: false
    })
  }
  async hardDeleteOne(filter: FilterQuery<T>) {
    // INFO: Hard Detele one
    return this.model.deleteOne(filter)
  }
  async hardDeleteMany(filter: FilterQuery<T>) {
    // INFO: Hard delete many
    return this.model.deleteMany(filter)
  }
}
