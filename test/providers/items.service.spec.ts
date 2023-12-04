import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { User } from 'src/users/users.model';
import { AuthService } from 'src/auth/auth.service';
import { ItemsModule } from 'src/items/items.module';
import { ItemsService } from 'src/items/items.service';

describe('Auth Service', () => {
  let app: INestApplication;
  let itemsService: ItemsService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        ItemsModule,
      ],
    }).compile();

    itemsService = testModule.get<ItemsService>(ItemsService);
    app = testModule.createNestApplication();

    await app.init();
  });

  it('should find by id', async () => {
    const item = await itemsService.findOne(1);

    expect(item.dataValues).toEqual(
      expect.objectContaining({
        id: 1,
        price: expect.any(Number),
        brand: expect.any(String),
        vendor_code: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        quantity: expect.any(Number),
        bestsellers: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        diagonal: expect.any(Number),
        cpu: expect.any(String),
        cores: expect.any(Number),
        main_camera: expect.any(Number),
        front_camera: expect.any(Number),
        battery: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find by name', async () => {
    const item = await itemsService.findOneByName('A vinculum.');

    expect(item.dataValues).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        price: expect.any(Number),
        brand: expect.any(String),
        vendor_code: expect.any(String),
        name: 'A vinculum.',
        description: expect.any(String),
        images: expect.any(String),
        quantity: expect.any(Number),
        bestsellers: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        diagonal: expect.any(Number),
        cpu: expect.any(String),
        cores: expect.any(Number),
        main_camera: expect.any(Number),
        front_camera: expect.any(Number),
        battery: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find by search string', async () => {
    const items = await itemsService.searchByString('nos');

    expect(items.rows.length).toBeLessThanOrEqual(20);

    items.rows.forEach((item) => {
      expect(item.name.toLowerCase()).toContain('nos');

      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          price: expect.any(Number),
          brand: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          quantity: expect.any(Number),
          bestsellers: expect.any(Boolean),
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          diagonal: expect.any(Number),
          cpu: expect.any(String),
          cores: expect.any(Number),
          main_camera: expect.any(Number),
          front_camera: expect.any(Number),
          battery: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find bestsellers', async () => {
    const items = await itemsService.bestsellers();

    items.rows.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          price: expect.any(Number),
          brand: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          quantity: expect.any(Number),
          bestsellers: true,
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          diagonal: expect.any(Number),
          cpu: expect.any(String),
          cores: expect.any(Number),
          main_camera: expect.any(Number),
          front_camera: expect.any(Number),
          battery: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find new items', async () => {
    const items = await itemsService.new();

    items.rows.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          price: expect.any(Number),
          brand: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          quantity: expect.any(Number),
          bestsellers: expect.any(Boolean),
          new: true,
          popularity: expect.any(Number),
          diagonal: expect.any(Number),
          cpu: expect.any(String),
          cores: expect.any(Number),
          main_camera: expect.any(Number),
          front_camera: expect.any(Number),
          battery: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });
});
