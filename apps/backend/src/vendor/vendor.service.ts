import { Injectable } from "@nestjs/common";
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
} from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Vendor } from "./entity/vendor.entity";
import { vendorRequestShape } from "./vendor.controller";
import { v4 } from "uuid";
import { VendorRO } from "./ro";

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: EntityRepository<Vendor>,
    private readonly em: EntityManager
  ) {}

  async createVendor(data: vendorRequestShape["registerVendor"]["body"]) {
    const vendorCode = v4();
    const vendor = new Vendor({
      vendorCode,
      name: data.name,
      contactDetails: data.contactDetails,
      address: data.address,
    });
    await this.em.persistAndFlush(vendor);
  }

  async updateVendor() {}

  async listAllVendor() {
    const vendors = await this.vendorRepository.findAll();
    return vendors.map((vendor) => new VendorRO(vendor));
  }

  async vendorDetailsByCode() {}

  async deleteVendor() {}
}
