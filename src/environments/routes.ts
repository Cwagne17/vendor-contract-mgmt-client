import { environment } from "./environment";
import * as querystring from 'query-string';

export const VENDOR_ROUTES = {
    CREATE_VENDOR(): string {
        return `${environment.apiURL}/vendor`;
    },

    SEARCH_VENDORS(query: any): string {
        return `${environment.apiURL}/vendors?${querystring.stringify(query)}`;
    },

    UPDATE_VENDOR(id: string): string {
        return `${environment.apiURL}/vendor/${id}`;
    },
}

export const CONTRACT_ROUTES = {


}

export const PAYMENT_ROUTES = {


}

export const WORK_TYPE_ROUTES = {


}