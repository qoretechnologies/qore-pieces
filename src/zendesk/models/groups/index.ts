export interface IGroupInterface {
    created_at: string,
    default: boolean,
    deleted: boolean,
    description: string,
    id: number,
    is_public: boolean,
    name: string,
    updated_at: string,
    url: string,
}

export interface IResponseGroupInterface {
    data: {
        group: IGroupInterface,
    }
}

export interface IGroupsInterface {
    data: {
        groups: IGroupInterface[],
        next_page: null | number,
        previous_page: null | number,
        count: number
    }
}

export interface IUpdateCreateGroupInterface extends Partial<IGroupInterface> { }