import { Vendor } from "./entity/vendor.entity";

export class VendorRO {
  name: string;
  contactDetails: string;
  address: string;
  vendorCode: string;
  onTimeDeliveryRate: number | null;
  qualityRatingAvg: number | null;
  averageResponseTime: number | null;
  fulfillmentRate: number | null;

  constructor(vendor: Vendor) {
    this.name = vendor.name;
    this.address = vendor.address;
    this.contactDetails = vendor.contactDetails;
    this.vendorCode = vendor.vendorCode;
    this.onTimeDeliveryRate = vendor.onTimeDeliveryRate;
    this.qualityRatingAvg = vendor.qualityRatingAvg;
    this.averageResponseTime = vendor.averageResponseTime;
    this.fulfillmentRate = vendor.fulfillmentRate;
  }
}
