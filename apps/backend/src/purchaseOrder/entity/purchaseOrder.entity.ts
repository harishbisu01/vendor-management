import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne,
    Enum,
    BaseEntity,
  } from "@mikro-orm/core";
import { Vendor } from "../../vendor/entity/vendor.entity";
  
  
  export enum POStatusEnum {
    pending = "pending",
    completed = "completed",
    canceled = "canceled",
  }
  
  @Entity()
  export class PurchaseOrder {
    @PrimaryKey()
    poNumber: string;
  
    @ManyToOne()
    vendor: Vendor;
  
    @Property()
    orderDate: Date;
  
    @Property()
    deliveryDate: Date;
  
    @Property({ columnType: "jsonb", nullable: true })
    items: Record<string, any> | null;
  
    @Property()
    quantity: number;
  
    @Enum({ items: () => POStatusEnum, default: POStatusEnum.pending })
    status!: POStatusEnum;
  
    @Property({ nullable: true })
    qualityRating: number | null = null;
  
    @Property()
    issueDate: Date ;
  
    @Property({ nullable: true })
    acknowledgmentDate: Date | null = null;
  
    constructor({
      poNumber,
      vendor,
      orderDate,
      deliveryDate,
      issueDate,
      items,
      quantity,
    }: {
      poNumber: string;
      vendor: Vendor;
      orderDate: Date;
      deliveryDate: Date;
      issueDate: Date;
      items: Record<string, any>;
      quantity: number;
    }) {
      this.poNumber = poNumber;
      this.vendor = vendor;
      this.orderDate = orderDate;
      this.deliveryDate = deliveryDate;
      this.issueDate = issueDate;
      this.items = items;
      this.quantity = quantity;
    }
  }
  