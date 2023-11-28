import { ApiProperty } from '@nestjs/swagger';

export class ShoppingCartItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 44666 })
  price: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 0 })
  count: number;

  @ApiProperty({ example: 44666 })
  total_price: number;

  @ApiProperty({ example: 4 })
  userId: number;

  @ApiProperty({ example: 'Huawei' })
  brand: string;

  @ApiProperty({
    example: 'https://loremflickr.com/640/480/technics?lock=2965134829944832',
  })
  image: string;

  @ApiProperty({ example: 'Defleo stillicidium.' })
  name: string;

  @ApiProperty({ example: '2023-11-28T17:29:11.782Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-11-28T17:29:11.782Z' })
  createdAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}
export class AddToCartResponse extends ShoppingCartItem {}

export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}
export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}

export class UpdateTotalPriceResponse {
  @ApiProperty({ example: 1000 })
  total_price: number;
}
export class UpdateTotalPriceRequest {
  @ApiProperty({ example: 1000 })
  total_price: number;
}
