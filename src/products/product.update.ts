import { Action, Hears, Help, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { ActionButtons } from '../buttons/action.buttons';
import { ProductService } from './product.serivce';
import { showCatalog } from './product.utlis';
import { Context } from 'src/context.interface';
import { CartService } from 'src/cart/cart.service';

@Update()
export class ProductUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}

  @Start()
  async getStarted(ctx: Context) {
    await ctx.replyWithHTML(
      `Привет, <i>${ctx.from.username}</i>!\n\nЯ бот кондитерской <b>"Сладкоежка"</b> и я буду твоим помощником!\n\nДля того, чтобы узнать, что я умею, отправь <b>/help</b>`,
    );
  }

  @Help()
  async getHelp(ctx: Context) {
    await ctx.replyWithHTML(
      `<b>Каталог</b> - Весь каталог имеющихся у нас продуктов\n\n<b>Новинки</b> - Новинки :)\n\n<b>Случайный продукт</b> - Я предложу тебе случайный продукт\n\n<b>Корзина</b> - Переход к корзине с продуктами для их оплаты`,
      ActionButtons(),
    );
  }

  @Hears('Каталог')
  async getCatalog(ctx: Context) {
    const catalog = await this.productService.getCatalog();

    showCatalog(ctx, catalog);
  }

  @Hears('Случайный продукт')
  async randomProduct(ctx: Context) {
    const catalog = await this.productService.getCatalog();

    const randomId = Math.floor(Math.random() * catalog.length);

    await ctx.replyWithPhoto(
      {
        url: `${catalog[randomId].imageUrl}`,
      },
      {
        caption: `${catalog[randomId].title}\n\n${catalog[randomId].description}\n\n${catalog[randomId].price}`,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Добавить в корзину', callback_data: `addProduct-${randomId}` }]
          ]
        }
      },
    );
    // ctx.reply(`${ctx.callbackQuery.data}`);
    ActionButtons();
  }

  @Action(/addProduct-(\d+)/)
  async addToCart(ctx: Context) {
    const { data } = ctx.callbackQuery;

    const [temp, tempId] = data.split('-');

    const product = await this.productService.getCatalog();

    await this.cartService.addProductToCart(ctx, product, tempId);
  }
}
