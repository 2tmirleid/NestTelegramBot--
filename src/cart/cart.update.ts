import { Action, Ctx, Hears, InjectBot, Message, On, Update } from "nestjs-telegraf";
import { CartButtons } from "src/buttons/cart.buttons";
import { Telegraf } from "telegraf";
import { CartService } from "./cart.service";
import { Context } from "src/context.interface";
import { showCart } from "./cart.utils";
import { ActionButtons } from "src/buttons/action.buttons";
import { Markup, inlineKeyboard } from "telegraf/typings/markup";

@Update()
export class CartUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly cartService: CartService,
  ) {}

  @Hears('Корзина')
  async cart(ctx: Context) {
    ctx.reply('Товары в вашей корзине:\n\n', CartButtons());
    const cart = await this.cartService.getCart();

    showCart(ctx, cart);
  }

  @Hears('Все товары')
  async getallProductsInCart(ctx: Context) {
    await this.cart(ctx);
  }

  @Hears('Очистить корзину')
  async cleanCart(ctx: Context) {
    const cart = await this.cartService.getCart();
    await this.cartService.cleanCart(ctx, cart);
  }

  @Hears('Продолжить покупки')
  async continueShopping(ctx: Context) {
    await ctx.reply(`Продолжаем покупки!`, ActionButtons());
  }

  @Hears('Оформить заказ')
  async ArrangeOrder(ctx: Context) {
    const cart = await this.cartService.getCart();
    let tempPrice = [];
    let costPrice = 0;

    cart.forEach((c) => {
      tempPrice.push(c.price.split('р')[0]);
    })
    tempPrice.forEach(t => {
      costPrice += Number(t)
    })
    
    await ctx.replyWithHTML(`Давайте перейдем к оформлению Вашего заказа!\n\n<b>Сумма Вашего заказа:</b> ${costPrice}р`, CartButtons());
  }

  @Action(/deleteProduct-(\d+)/)
  async addToCart(ctx: Context) {
    const { data } = ctx.callbackQuery;

    const [, tempId] = data.split('-');

    await this.cartService.deleteProductFromCart(ctx, Number(tempId));
    await this.cart(ctx);
  }
}
