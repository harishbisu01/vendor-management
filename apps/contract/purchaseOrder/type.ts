import { z } from "zod";

export const createPurchaseOrderDto = z.object({
  vendorCode: z.string(),
  orderDate: z.coerce.date(),
  deliveryDate: z.coerce.date(),
  issueDate: z.coerce.date(),
  items: z.array(z.record(z.string(), z.any())),
  quantity: z.number(),
});

export const updatePurchaseOrderDto = z.object({
  vendorCode: z.string(),
  orderDate: z.coerce.date(),
  deliveryDate: z.coerce.date(),
  issueDate: z.coerce.date(),
  items: z.array(z.record(z.string(), z.any())),
  quantity: z.number(),
  status: z.enum(["completed", "canceled", "pending"]),
  qualityRating: z.number().nullable(),
  acknowledgmentDate: z.coerce.date().nullable(),
});

export const PurchaseOrderList = z.array(
  z.object({
    vendorCode: z.string(),
    orderDate: z.coerce.date(),
    deliveryDate: z.coerce.date(),
    issueDate: z.coerce.date(),
    items: z.any(),
    status: z.enum(["pending", "completed", "canceled"]),
    quantity: z.number(),
    qualityRating: z.number().nullable(),
    acknowledgmentDate: z.date().nullable(),
  })
);
