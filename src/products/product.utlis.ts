import { ActionButtons } from '../buttons/action.buttons';

export function showCatalog(ctx, catalog) {
  catalog.forEach((c) => {
    ctx.replyWithPhoto(
      {
        url: `${c.imageUrl}`,
      },
      {
        caption: `${c.title}\n\n${c.description}\n\n${c.price}`,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Добавить в корзину', 
              callback_data: `addProduct-${c.id - 1}`
            }]
          ]
        }
      },
    );
  },
  ActionButtons(),)
}
