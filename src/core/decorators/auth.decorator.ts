import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_KEY = 'isAuth';

export const Auth = () => SetMetadata(IS_AUTH_KEY, true);
