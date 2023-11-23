import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Items extends Model {
  @Column
  brand: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  vendor_code: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  images: string;

  @Column({ defaultValue: 0 })
  quantity: number;

  @Column({ defaultValue: false })
  bestsellers: boolean;

  @Column({ defaultValue: false })
  new: boolean;

  @Column
  popularity: number;

  @Column
  diagonal: number;

  @Column
  cpu: string;

  @Column
  cores: number;

  @Column
  main_camera: string;

  @Column
  front_camera: string;

  @Column
  battery: number;
}
