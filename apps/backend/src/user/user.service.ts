import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { EntityRepository, FilterQuery } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async validateUser(email: string, password?: string) {
    const options: FilterQuery<User> = { email };
    if (password) options.password = password;
    return await this.userRepository.findOne(options);
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne(id);
  }
}
