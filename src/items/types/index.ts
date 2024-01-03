import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Op } from 'sequelize';

class Items {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  brand: string;

  @ApiProperty({ example: 12345 })
  price: number;

  @ApiProperty({ example: faker.internet.password() })
  vendor_code: string;

  @ApiProperty({ example: faker.lorem.word() })
  name: string;

  @ApiProperty({ example: faker.lorem.sentence(10) })
  description: string;

  @ApiProperty({ example: faker.image.urlLoremFlickr({ category: 'city' }) })
  images: string;

  @ApiProperty({ example: 5 })
  quantity: number;

  @ApiProperty({ example: true })
  bestsellers: boolean;

  @ApiProperty({ example: true })
  new: boolean;

  @ApiProperty({ example: 12 })
  popularity: number;

  @ApiProperty({ example: 5 })
  diagonal: number;

  @ApiProperty({ example: 'Intel Core i3' })
  cpu: string;

  @ApiProperty({ example: 4 })
  cores: number;

  @ApiProperty({ example: 24 })
  main_camera: number;

  @ApiProperty({ example: 12 })
  front_camera: number;

  @ApiProperty({ example: 4000 })
  battery: number;

  @ApiProperty({ example: '2023-11-23T20:54:03.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-11-23T20:54:03.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Items, isArray: true })
  rows: Items;
}

export class Bestsellers extends Items {
  @ApiProperty({ example: true })
  bestsellers: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Items, isArray: true })
  rows: Bestsellers;
}

export class New extends Items {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Items, isArray: true })
  rows: New;
}

export class SearchByLetterResponse extends Items {
  @ApiProperty({ example: 'l' })
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}

export class SearchRequest {
  @ApiProperty({ example: 'l' })
  search: string;
}

export class GetByNameResponse extends Items {
  @ApiProperty({ example: 'Charisma adulescens.' })
  name: string;
}

export class GetByNameRequest {
  @ApiProperty({ example: 'Charisma adulescens.' })
  name: string;
}

export class FindOneResponse extends Items {}

export interface IBrandQuery {
  limit: string;
  offset: string;
  item: string | undefined;
  brand: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}

export interface IBrandFilter {
  brand: string | undefined;
  price: { [Op.between]: number[] };
}
