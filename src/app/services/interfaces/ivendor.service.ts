export interface IVendorService {
    createVendor(createVendorDto: any): Promise<void>;

    searchVendors(query: any): Promise<any[]>;

    updateVendor(id: string, updateVendorDto: any): Promise<void>;
}