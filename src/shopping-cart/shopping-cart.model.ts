import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  userId: number;

  @Column({ defaultValue: 0 })
  itemId: number;

  @Column
  brand: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  name: string;

  @Column
  image: string;

  @Column({ defaultValue: 0 })
  quantity: number;

  @Column({ defaultValue: 1 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}
