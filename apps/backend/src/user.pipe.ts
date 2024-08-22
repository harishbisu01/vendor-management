import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(id: string) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
