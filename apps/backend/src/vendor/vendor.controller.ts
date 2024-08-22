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
import { AdminAuth, Auth } from "src/common/decorators/admins.auth.decorator";
import { UserRole } from "src/user/entities/user.entity";
import { VendorService } from "./vendor.service";
import { VendorRO } from "./ro";
export const vendorContractController = nestControllerContract(contract.vendor);
export type vendorRequestShape = NestRequestShapes<
  typeof vendorContractController
>;

@Controller()
export class VendorController
  implements NestControllerInterface<typeof vendorContractController>
{
  constructor(private readonly vendorService: VendorService) {}
  @AdminAuth([UserRole.admin])
  @TsRest(vendorContractController.registerVendor)
  async registerVendor(
    @TsRestRequest() { body }: vendorRequestShape["registerVendor"]
  ) {
    await this.vendorService.createVendor(body);
    return {
      status: 200 as const,
      body: {
        isSuccess: true,
        message: "Registration successfully.",
      },
    };
  }

  @AdminAuth([UserRole.admin])
  @TsRest(vendorContractController.listAllVendors)
  async listAllVendors() {
    const result = await this.vendorService.listAllVendor();
    return {
      status: 200 as const,
      body: result,
    };
  }
}
