import { POStatusEnum, PurchaseOrder } from "./entity/purchaseOrder.entity";

export class PurchaseOrderRO {
  vendorCode: string;
  orderDate: Date;
  deliveryDate: Date;
  issueDate: Date;
  items: Record<string, any> | null;
  status: POStatusEnum;
  quantity: number;
  qualityRating: number | null;
  acknowledgmentDate: Date | null;
  constructor(purchaseOrder: PurchaseOrder) {
    this.vendorCode = purchaseOrder.vendor.vendorCode;
    this.orderDate = purchaseOrder.orderDate;
    this.deliveryDate = purchaseOrder.deliveryDate;
    this.issueDate = purchaseOrder.issueDate;
    this.items = purchaseOrder.items;
    this.status = purchaseOrder.status;
    this.qualityRating = purchaseOrder.qualityRating;
    this.quantity = purchaseOrder.quantity;
    this.acknowledgmentDate = purchaseOrder.acknowledgmentDate;
  }
}
