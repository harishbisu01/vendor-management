import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { authRequestShape } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { EntityManager } from '@mikro-orm/postgresql';
import { UsertTokenRO } from 'src/common/common.ro';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly em: EntityManager,
  ) {}
  async registerUser(data: authRequestShape['registerUser']['body']) {
    const userExists = await this.userService.validateUser(data.email);
    if (userExists) {
      throw new BadRequestException(
        `Hey! your email already exists.Please log in.`,
      );
    }
    const id = uuidv4();
    const newUser = new User({
      id,
      name: data.name,
      email: data.email,
      password: data.password,
    });
    this.em.persist(newUser);
    await this.em.flush();
  }

  async logIn(data: authRequestShape['logIn']['body']) {
    const user = await this.userService.validateUser(data.email, data.password);
    if (!user) {
      throw new BadRequestException(
        `Oops incorrect credentials. Please try again.`,
      );
    }
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return new UsertTokenRO(token);
  }
}
