import { Controller } from "@nestjs/common";
import { contract } from "contract";
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from "@ts-rest/nest";
import { z } from "zod";
import { User } from "src/common/decorators/user.decorator";
import { AdminAuth } from "src/common/decorators/admins.auth.decorator";
import { UserRole } from "src/user/entities/user.entity";
import { PurchaseOrderService } from "./purchaseOrder.service";
export const purchaseOrderContractController = nestControllerContract(
  contract.purchaseOrder
);
export type purchaseOrderRequestShape = NestRequestShapes<
  typeof purchaseOrderContractController
>;

@Controller()
export class PurchaseOrderController
  implements NestControllerInterface<typeof purchaseOrderContractController>
{
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}
  @AdminAuth([UserRole.admin])
  @TsRest(purchaseOrderContractController.createPurchaseOrder)
  async createPurchaseOrder(
    @TsRestRequest() { body }: purchaseOrderRequestShape["createPurchaseOrder"]
  ) {
    await this.purchaseOrderService.createPurchaseOrder(body);
    return {
      status: 200 as const,
      body: {
        isSuccess: true,
        message: "Registration successfully.",
      },
    };
  }

  @AdminAuth([UserRole.admin])
  @TsRest(purchaseOrderContractController.listAllPurchaseOrder)
  async listAllPurchaseOrder(
    @TsRestRequest()
    { query }: purchaseOrderRequestShape["listAllPurchaseOrder"]
  ) {
    const result = await this.purchaseOrderService.listAllPurchase(
      query.vendorCode
    );
    return {
      status: 200 as const,
      body: result,
    };
  }

  @AdminAuth([UserRole.admin])
  @TsRest(purchaseOrderContractController.updatePurchaseOrder)
  async updatePurchaseOrder(
    @TsRestRequest()
    { body, params }: purchaseOrderRequestShape["updatePurchaseOrder"]
  ) {
    await this.purchaseOrderService.updatePurchaseOrder(body, params.poId);
    return {
      status: 200 as const,
      body: {
        isSuccess: true,
        message: "Registration successfully.",
      },
    };
  }
}
