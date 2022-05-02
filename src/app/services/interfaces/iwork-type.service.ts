import { CreateWorkTypeDto, SearchWorkTypesDto, WorkType, UpdateWorkTypeDto } from "../../types/work-type";

export interface IWorkTypeService {

    /**
     * POST request function to create a new work type in the database
     * 
     * @param createWorkTypeDto - Request Body validated by the CreateWorkTypeDto class
     */
    createWorkType(createWorkTypeDto: CreateWorkTypeDto): Promise<void>;

    /**
     * GET request function to get many work types associated to a given query
     * 
     * @param query - Request Query validated by the SearchWorkTypeDto class
     */
    searchWorkType(query: SearchWorkTypesDto): Promise<WorkType[]>;

    /**
     * PATCH request function to update an existing work type in the database
     * 
     * @param id - Request Param worktypeId
     * @param updateWorkTypeDto - Request Body validated by the UpdateWorkTypeDto
     */
    updateWorkType(id: string, updateWorkTypeDto: UpdateWorkTypeDto): Promise<void>;

    /**
     * DELETE request function to delete an existing work type in the database
     * 
     * @param id - Request Param worktypeId
     */
    deleteWorkType(id: string): Promise<void>;

}