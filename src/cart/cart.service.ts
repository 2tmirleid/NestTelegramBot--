import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { Repository } from "typeorm";
import { CartButtons } from "src/buttons/cart.buttons";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}


  async addProductToCart(ctx, product, id) {
    const title = product[id].title;
    const description = product[id].description;
    const price = product[id].price;
    const imageUrl = product[id].imageUrl;

    const addedProduct = await this.cartRepository.create({
      title,
      description,
      price,
      imageUrl
    });

    await this.cartRepository.save(addedProduct);

    ctx.reply(`Товар ${title} успешно добавлен к корзину!`);
  }

  async getCart() {
    return await this.cartRepository.find();
  }

  async deleteProductFromCart(ctx, productId: number) {
    const id = productId + 1;
    await this.cartRepository.delete({ id });

    await ctx.reply(`Товар успешно удален из корзины!`, CartButtons());
  }

  async cleanCart(ctx, cart) {
    await this.cartRepository.clear();

    await ctx.reply('Товары успешно удалены из корзины!', CartButtons());
  }
}
