import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPipe } from 'src/user.pipe';

export const User = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return String(request.user.userId);
});

export const GetUserFromToken = () => User(UserPipe);
