import { Markup } from 'telegraf';

export function ActionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback('Каталог', 'catalog'),
      Markup.button.callback('Новинки', 'novelties'),
      Markup.button.callback('Случайный продукт', 'random'),
      Markup.button.callback('Корзина', 'cart'),
    ],
    {
      columns: 2,
    },
  ).resize();
}

