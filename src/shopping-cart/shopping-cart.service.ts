import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/items.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private shoppingCartModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username },
    });
    const item = await this.itemsService.findOne(addToCartDto.itemId);

    cart.userId = user.id;
    cart.itemId = item.id;
    cart.brand = item.brand;
    cart.price = item.price;
    cart.quantity = item.quantity;
    cart.image = JSON.parse(item.images)[0];
    cart.name = item.name;
    cart.total_price = item.price;

    return cart.save();
  }

  async updateCount(
    count: number,
    itemId: number | string,
  ): Promise<{ count: number }> {
    await this.shoppingCartModel.update({ count }, { where: { itemId } });

    const item = await this.shoppingCartModel.findOne({ where: { itemId } });

    return { count: item.count };
  }

  async updateTotalPrice(
    total_price: number,
    itemId: number | string,
  ): Promise<{ total_price: number }> {
    await this.shoppingCartModel.update({ total_price }, { where: { itemId } });

    const item = await this.shoppingCartModel.findOne({ where: { itemId } });

    return { total_price: item.total_price };
  }

  async remove(itemId: number | string): Promise<void> {
    const item = await this.shoppingCartModel.findOne({ where: { itemId } });

    await item.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { userId } });
  }
}
