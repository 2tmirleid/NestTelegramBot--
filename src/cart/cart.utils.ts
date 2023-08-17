import { CartButtons } from "src/buttons/cart.buttons";

export function showCart(ctx, cart) {
    cart.forEach((c) => {
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
              text: 'Удалить', callback_data: `deleteProduct-${c.id - 1}` 
            }]
          ]
        }
        },
      );
    },
    CartButtons(),
    )
  }