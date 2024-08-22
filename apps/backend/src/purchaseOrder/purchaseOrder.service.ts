import { Injectable } from "@nestjs/common";
import { EntityManager, EntityRepository, wrap } from "@mikro-orm/postgresql";
import { POStatusEnum, PurchaseOrder } from "./entity/purchaseOrder.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { purchaseOrderRequestShape } from "./purchaseOrder.controller";
import { v4 } from "uuid";
import { Vendor } from "src/vendor/entity/vendor.entity";
import { PurchaseOrderRO } from "./ro";
import { stat } from "fs";

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepository: EntityRepository<PurchaseOrder>,

    @InjectRepository(Vendor)
    private readonly vendorRepository: EntityRepository<Vendor>,

    private readonly em: EntityManager
  ) {}

  async createPurchaseOrder(
    data: purchaseOrderRequestShape["createPurchaseOrder"]["body"]
  ) {
    const poNumber = v4();
    const vendor = await this.vendorRepository.findOneOrFail({
      vendorCode: data.vendorCode,
    });
    const purchaseOrder = new PurchaseOrder({
      poNumber,
      vendor,
      orderDate: data.orderDate,
      deliveryDate: data.deliveryDate,
      issueDate: data.issueDate,
      quantity: data.quantity,
      items: data.items,
    });
    await this.em.persistAndFlush(purchaseOrder);
  }

  async listAllPurchase(
    vendorCode: purchaseOrderRequestShape["listAllPurchaseOrder"]["query"]["vendorCode"]
  ) {
    if (vendorCode) {
      const purchaseOrders = await this.purchaseOrderRepository.find({
        vendor: { vendorCode },
      });
      return purchaseOrders.map(
        (purchaseOrder) => new PurchaseOrderRO(purchaseOrder)
      );
    }
    const purchaseOrders = await this.purchaseOrderRepository.findAll();
    return purchaseOrders.map(
      (purchaseOrder) => new PurchaseOrderRO(purchaseOrder)
    );
  }

  async updatePurchaseOrder(
    data: purchaseOrderRequestShape["updatePurchaseOrder"]["body"],
    poId: string
  ) {
    const purchaseOrder = await this.purchaseOrderRepository.findOneOrFail({
      poNumber: poId,
    });
  
    let status = POStatusEnum.pending;
    if (data.status === "completed") status = POStatusEnum.completed;
    if (data.status === "canceled") status = POStatusEnum.canceled;
  
    wrap(purchaseOrder).assign({
      orderDate: data.orderDate,
      issueDate: data.issueDate,
      deliveryDate: data.deliveryDate,
      status,
      acknowledgmentDate: data.acknowledgmentDate,
      quantity: data.quantity,
      qualityRating: data.qualityRating,
    });
  
    // Update vendor performance metrics if the status is 'completed'
    if (status === POStatusEnum.completed) {
      await this.updateVendorPerformance(purchaseOrder.vendor.vendorCode);
    }
    await this.em.flush();
  }
  
  private async updateVendorPerformance(vendorCode: string) {
    const vendor = await this.vendorRepository.findOneOrFail({ vendorCode });
  
    // Fetch all completed purchase orders for this vendor
    const completedOrders = await this.purchaseOrderRepository.find({
      vendor: vendor,
      status: POStatusEnum.completed,
    });
  
    // On-Time Delivery Rate
    const onTimeDeliveries = completedOrders.filter(
      (po) => po.deliveryDate && po.deliveryDate <= po.issueDate
    ).length;
    vendor.onTimeDeliveryRate =
      completedOrders.length > 0
        ? (onTimeDeliveries / completedOrders.length) * 100
        : null;
  
    // Quality Rating Average
    const totalQualityRating = completedOrders.reduce(
      (sum, po) => sum + (po.qualityRating || 0),
      0
    );
    vendor.qualityRatingAvg =
      completedOrders.length > 0
        ? totalQualityRating / completedOrders.length
        : null;
  
    // Average Response Time
    const totalResponseTime = completedOrders.reduce((sum, po) => {
      if (po.acknowledgmentDate && po.issueDate) {
        return sum + (po.acknowledgmentDate.getTime() - po.issueDate.getTime());
      }
      return sum;
    }, 0);
    vendor.averageResponseTime =
      completedOrders.length > 0
        ? totalResponseTime / completedOrders.length
        : null;
  
    const successfulFulfillments = completedOrders.filter(
      (po) => po.qualityRating !== null
    ).length;
    vendor.fulfillmentRate =
      completedOrders.length > 0
        ? (successfulFulfillments / completedOrders.length) * 100
        : null;``
  }
}
