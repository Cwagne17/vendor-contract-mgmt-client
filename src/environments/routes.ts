import { environment } from "./environment";
import * as querystring from 'query-string';

export const VENDOR_ROUTES = {
    CREATE_VENDOR(): string {
        return `${environment.apiURL}/vendor`;
    },

    GET_VENDOR_BY_NAME(name: string): string {
        return `${environment.apiURL}/vendor/${name}`;
    },

    SEARCH_VENDORS(query: any): string {
        return `${environment.apiURL}/vendors?${querystring.stringify(query)}`;
    },

    UPDATE_VENDOR(id: string): string {
        return `${environment.apiURL}/vendor/${id}`;
    }
}

export const CONTRACT_ROUTES = {
    CREATE_CONTRACT(vendorId: string): string {
        return `${environment.apiURL}/vendor/${vendorId}/contract`;
    },

    SEARCH_CONTRACTS(query: any): string {
        return `${environment.apiURL}/contracts?${querystring.stringify(query)}`;
    },

    UPDATE_CONTRACT(vendorId: string, id: string): string {
        return `${environment.apiURL}/vendor/${vendorId}/contract/${id}`;
    },

    DELETE_CONTRACT(vendorId: string, id: string): string {
        return `${environment.apiURL}/vendor/${vendorId}/contract/${id}`;
    },

    DOWNLOAD_CONTRACT(vendorId: string, id: string): string {
        return `${environment.apiURL}/vendor/${vendorId}/contract/${id}/download`;
    }
}

export const PAYMENT_ROUTES = {
    CREATE_PAYMENT(vendorId: string, contractId: string): string {
        return `${environment.apiURL}/vendor/${vendorId}/contract/${contractId}/payment`;
    },

    GET_ALL_PAYMENT_INFO(vendorId: string, contractId: string): string {
        return `${environment.apiURL}/vendor/${vendorId}/contract/${contractId}/payments`;
    },

    UPDATE_PAYMENT(vendorId: string, contractId: string, id: string): string {
        return `${environment.apiURL}/vendor/${vendorId}/contract/${contractId}/payment/${id}`;
    },

    DELETE_PAYMENT(vendorId: string, contractId: string, id: string): string {
        return `${environment.apiURL}/vendor/${vendorId}/contract/${contractId}/payment/${id}`;
    }
}

export const WORK_TYPE_ROUTES = {
    CREATE_WORK_TYPE(): string {
        return `${environment.apiURL}/work-type`;
    },

    SEARCH_WORK_TYPE(query: any): string {
        return `${environment.apiURL}/work-types?${querystring.stringify(query)}`;
    },

    UPDATE_WORK_TYPE(id: string): string {
        return `${environment.apiURL}/work-type/${id}`;
    },

    DELETE_WORK_TYPE(id: string): string {
        return `${environment.apiURL}/work-type/${id}`;
    }
}