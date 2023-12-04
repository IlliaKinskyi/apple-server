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

const mockedUser = {
  username: 'Jhon',
  email: 'john@gmail.com',
  password: '123456',
};

describe('Items Controller', () => {
  let app: INestApplication;

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
        AuthModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: 'keyworld',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
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

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
  });

  it('should get one item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/items/find/1')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
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
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('should get bestsellers', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/items/bestsellers')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get new items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/items/new')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should search by string', async () => {
    const body = { search: 'nos' };
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/items/search')
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows.length).toBeLessThanOrEqual(20);

    response.body.rows.forEach((element) => {
      expect(element.name.toLowerCase()).toContain(body.search);
    });
    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get by name', async () => {
    const body = { name: 'A vinculum.' };
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/items/name')
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
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
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });
});
