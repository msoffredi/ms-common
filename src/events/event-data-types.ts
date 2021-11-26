export enum Types {
    UserDeleted = 'user.deleted',
    UserCreated = 'user.created',
}

export interface UserDeletedEventDataType {
    type: Types.UserDeleted;
    data: {
        id: string;
        email: string;
    };
}

export interface UserCreatedEventDataType {
    type: Types.UserCreated;
    data: {
        id: string;
        email: string;
    };
}

export type EventDataType = UserDeletedEventDataType | UserCreatedEventDataType;
