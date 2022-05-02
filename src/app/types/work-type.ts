export interface WorkType {
    id: string

    type: string
}

export interface CreateWorkTypeDto {

    type: string
}

export interface UpdateWorkTypeDto extends CreateWorkTypeDto {}

export interface SearchWorkTypesDto {

    text: string
}
