import {
    Collection,
    Entity,
    Enum,
    OneToMany,
    PrimaryKey,
    Property,
    Unique,
  } from "@mikro-orm/core";
  
  export enum UserRole {
    vendor = "vendor",
    admin = "admin",
  }
  
  @Entity({ schema: "public" })
  export class Vendor {
    @PrimaryKey()
    vendorCode: string;
  
    @Property()
    name: string;
  
    @Property()
    contactDetails: string;
  
    @Property()
    address: string;
  
    @Property({ nullable: true })
    onTimeDeliveryRate: number | null = null;
  
    @Property({ nullable: true })
    qualityRatingAvg: number | null = null;
  
    @Property({ nullable: true })
    averageResponseTime: number | null = null;
  
    @Property({ nullable: true })
    fulfillmentRate: number | null = null;
  
    // @OneToMany({
    //   entity: () => PurchaseOrder,
    //   mappedBy: "vendor",
    // })
    // purchaseOrders = new Collection<Vendor>(this);
  
    constructor({
      vendorCode,
      name,
      contactDetails,
      address,
    }: {
      vendorCode: string;
      name: string;
      contactDetails: string;
      address: string;
    }) {
      this.vendorCode = vendorCode;
      this.name = name;
      this.address = address;
      this.contactDetails = contactDetails;
    }
  }
  