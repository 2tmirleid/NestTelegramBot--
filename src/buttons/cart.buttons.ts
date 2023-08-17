import { Markup } from "telegraf";

export function CartButtons() {
    return Markup.keyboard([  
        Markup.button.callback('Все товары', ''),
        Markup.button.callback('Оформить заказ', ''),
        Markup.button.callback('Продолжить покупки', ''),
        Markup.button.callback('Очистить корзину', '')
    ], 
    {
        columns: 2
    },).resize();
}