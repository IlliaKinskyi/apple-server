const { faker } = require('@faker-js/faker');
('use strict');

const itemsBrand = [
  'Apple',
  'Samsung',
  'Realme',
  'Xiaomi',
  'Moto',
  'Huawei',
  'Nokia',
  'Sigma',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Items',
      [...Array(100)].map(() => ({
        brand: itemsBrand[Math.floor(Math.random() * itemsBrand.length)],
        price: faker.number.int({ min: 1000, max: 50000 }),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
        images: JSON.stringify(
          [...Array(7)].map(
            () => `${faker.image.urlLoremFlickr({ category: 'technics' })}`,
          ),
        ),
        vendor_code: faker.internet.password(),
        quantity: faker.number.int({ min: 1, max: 9 }),
        bestsellers: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.number.int(3),
        diagonal: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
        cpu: faker.lorem.sentence(3),
        cores: faker.number.int({ min: 2, max: 8 }),
        main_camera: faker.number.int({ min: 12, max: 48 }),
        front_camera: faker.number.int({ min: 3, max: 24 }),
        battery: faker.number.int({ min: 1000, max: 5000 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items', null, {});
  },
};
