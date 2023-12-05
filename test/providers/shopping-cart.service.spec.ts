import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { User } from 'src/users/users.model';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthModule } from 'src/auth/auth.module';
import { ItemsModule } from 'src/items/items.module';
import { ItemsService } from 'src/items/items.service';
import { UsersService } from 'src/users/users.service';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';

const mockedUser = {
  username: 'Jhon',
  email: 'john@gmail.com',
  password: '123456',
};

describe('Items Controller', () => {
  let app: INestApplication;
  let itemsService: ItemsService;
  let usersService: UsersService;
  let shoppingCartService: ShoppingCartService;

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
        ShoppingCartModule,
        ItemsModule,
        AuthModule,
      ],
    }).compile();

    itemsService = testModule.get<ItemsService>(ItemsService);
    usersService = testModule.get<UsersService>(UsersService);
    shoppingCartService =
      testModule.get<ShoppingCartService>(ShoppingCartService);

    app = testModule.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new ShoppingCart();
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const item = await itemsService.findOne(1);

    cart.userId = user.id;
    cart.itemId = item.id;
    cart.brand = item.brand;
    cart.price = item.price;
    cart.quantity = item.quantity;
    cart.image = JSON.parse(item.images)[0];
    cart.name = item.name;
    cart.total_price = item.price;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { itemId: 1 } });
  });

  it('should return all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    cart.forEach((item) =>
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          itemId: expect.any(Number),
          price: expect.any(Number),
          brand: expect.any(String),
          name: expect.any(String),
          image: expect.any(String),
          quantity: expect.any(Number),
          count: expect.any(Number),
          total_price: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ),
    );
  });

  it('should add cart item', async () => {
    await shoppingCartService.add({
      username: mockedUser.username,
      itemId: 3,
    });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find((item) => item.itemId === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        itemId: 3,
        price: expect.any(Number),
        brand: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
        quantity: expect.any(Number),
        count: expect.any(Number),
        total_price: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should return updated count', async () => {
    const result = await shoppingCartService.updateCount(2, 1);

    expect(result).toEqual({ count: 2 });
  });

  it('should return updated total price', async () => {
    const item = await itemsService.findOne(1);
    const result = await shoppingCartService.updateTotalPrice(
      item.price * 3,
      1,
    );

    expect(result).toEqual({ total_price: item.price * 3 });
  });

  it('should delete all cart items', async () => {
    await shoppingCartService.remove(1);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find((item) => item.itemId === 1)).toBeUndefined();
  });

  it('should delete cart item', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await shoppingCartService.removeAll(user.id);

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart).toStrictEqual([]);
  });
});
