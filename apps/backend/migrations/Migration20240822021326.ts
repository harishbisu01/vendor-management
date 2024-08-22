import { Migration } from '@mikro-orm/migrations';

export class Migration20240822021326 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "role" text check ("role" in (\'user\', \'admin\')) not null default \'user\', "password" text null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "vendor" ("vendor_code" varchar(255) not null, "name" varchar(255) not null, "contact_details" varchar(255) not null, "address" varchar(255) not null, "on_time_delivery_rate" int null, "quality_rating_avg" int null, "average_response_time" int null, "fulfillment_rate" int null, constraint "vendor_pkey" primary key ("vendor_code"));');

    this.addSql('create table "purchase_order" ("po_number" varchar(255) not null, "vendor_vendor_code" varchar(255) not null, "order_date" timestamptz not null, "delivery_date" timestamptz not null, "items" jsonb null, "quantity" int not null, "status" text check ("status" in (\'pending\', \'completed\', \'canceled\')) not null default \'pending\', "quality_rating" int null, "issue_date" timestamptz not null, "acknowledgment_date" timestamptz null, constraint "purchase_order_pkey" primary key ("po_number"));');

    this.addSql('alter table "purchase_order" add constraint "purchase_order_vendor_vendor_code_foreign" foreign key ("vendor_vendor_code") references "vendor" ("vendor_code") on update cascade;');
  }

}
