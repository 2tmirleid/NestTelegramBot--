import { Context as ContextTelegraf } from 'telegraf';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';

export interface Context extends ContextTelegraf {
    callbackQuery: CallbackQuery & { data: string },
    session: {
        type?: 'buy' | 'continue' | 'delete' | 'clean'
    }
}
