import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ length: 0 })
  createAt = new Date();

  @Property({ onUpdate: () => new Date(), length: 0 })
  updateAt = new Date();
}