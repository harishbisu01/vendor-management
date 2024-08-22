import { initContract } from "@ts-rest/core";
import { CommonSuccessSchema, UsertToken } from "../../contract/common";
import { VendorListDto, VendorRegisterDto } from "./type";
const c = initContract();
export const vendorContract = c.router(
  {
    registerVendor: {
      method: "POST",
      path: "/",
      responses: {
        200: CommonSuccessSchema,
      },
      body: VendorRegisterDto,
    },
    listAllVendors: {
      method: "GET",
      path: "/",
      responses: {
        200: VendorListDto,
      },
    },
  },
  {
    pathPrefix: "vendors",
  }
);
