import { initContract } from "@ts-rest/core";
import { authContract } from "./auth/contract";
import { vendorContract } from "./vendor/contract";
import { purchaseOrderContract } from "./purchaseOrder/contract";

const c = initContract();
export const contract = c.router({
  auth: authContract,
  vendor: vendorContract,
  purchaseOrder: purchaseOrderContract,
});
