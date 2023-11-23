import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Items } from './items.model';
import { IBrandQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items)
    private items: typeof Items,
  ) {}

  async paginateAndFilter(
    query: IBrandQuery,
  ): Promise<{ count: number; rows: Items[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    return this.items.findAndCountAll({
      limit,
      offset,
    });
  }

  async bestsellers(): Promise<{ count: number; rows: Items[] }> {
    return this.items.findAndCountAll({
      where: { bestsellers: true },
    });
  }

  async new(): Promise<{ count: number; rows: Items[] }> {
    return this.items.findAndCountAll({
      where: { new: true },
    });
  }

  async findOne(id: number): Promise<Items> {
    return this.items.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Items> {
    return this.items.findOne({
      where: { name },
    });
  }

  async searchByString(str: string): Promise<{ count: number; rows: Items[] }> {
    return this.items.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
