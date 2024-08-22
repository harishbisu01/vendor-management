import { initContract } from "@ts-rest/core";
import { CommonSuccessSchema } from "../../contract/common";
import { createPurchaseOrderDto, PurchaseOrderList, updatePurchaseOrderDto } from "./type";
import { z } from "zod";
const c = initContract();
export const purchaseOrderContract = c.router(
  {
    createPurchaseOrder: {
      method: "POST",
      path: "/",
      responses: {
        200: CommonSuccessSchema,
      },
      body: createPurchaseOrderDto,
    },
    listAllPurchaseOrder: {
      method: "GET",
      path: "/",
      responses: {
        200: PurchaseOrderList,
      },
      query: z.object({ vendorCode: z.string().optional() }),
    },
    updatePurchaseOrder: {
        method: "POST",
        path: "/:poId",
        responses: {
          200: CommonSuccessSchema,
        },
        body: updatePurchaseOrderDto,
      },
  },
  {
    pathPrefix: "purchase-orders",
  }
);
