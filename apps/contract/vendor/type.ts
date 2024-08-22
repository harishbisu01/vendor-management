import { z } from "zod";
export const VendorRegisterDto = z.object({
  name: z.string(),
  contactDetails: z.string(),
  address: z.string(),
});

export const VendorListDto = z.array(
  z.object({
    name: z.string(),
    contactDetails: z.string(),
    address: z.string(),
    vendorCode: z.string(),
    onTimeDeliveryRate: z.number().nullable(),
    qualityRatingAvg: z.number().nullable(),
    averageResponseTime: z.number().nullable(),
    fulfillmentRate: z.number().nullable(),
  })
);
