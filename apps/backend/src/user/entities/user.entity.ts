import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';

export enum UserRole {
  user = 'user',
  admin = 'admin'
}

@Entity({ schema: 'public' })
export class User {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @Property()
  @Unique()
  email: string;

  @Enum({ items: () => UserRole, default: UserRole.user })
  role = UserRole.user;

  @Property({ columnType: 'text', nullable: true })
  password: string;

  constructor({
    id,
    name,
    email,
    password,
  }: {
    id: string;
    name: string;
    email: string;
    password: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}