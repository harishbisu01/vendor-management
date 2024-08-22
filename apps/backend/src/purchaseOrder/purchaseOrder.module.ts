import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PurchaseOrder } from './entity/purchaseOrder.entity';
import { PurchaseOrderService } from './purchaseOrder.service';
import { PurchaseOrderController } from './purchaseOrder.controller';
import { Vendor } from 'src/vendor/entity/vendor.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [PurchaseOrder,Vendor],
    }),
  ],
  providers: [PurchaseOrderService],
  controllers: [PurchaseOrderController],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
