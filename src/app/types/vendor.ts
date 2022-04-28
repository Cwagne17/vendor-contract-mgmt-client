import { workType } from "./work-type"
import { statusTypes } from "./status"

export interface VendorQuery {
    text: string,
    status:  statusTypes[] // this will need to be defined as the enum like I was talking about above in contract, active, etc.
   work_type: workType // should be a defined entity in the types/work-type.ts file 
   sort: "ASC" | "DESC" | -1 | 1
   }