export enum Types {
    UserDeleted = 'user.deleted',
    UserDeletedHard = 'user.deleted.hard',
    UserCreated = 'user.created',
}

export interface UserDeletedEventDataType {
    type: Types.UserDeleted;
    data: {
        id: string;
        email: string;
    };
}

export interface UserDeletedHardEventDataType {
    type: Types.UserDeletedHard;
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

export type EventDataType =
    | UserDeletedEventDataType
    | UserCreatedEventDataType
    | UserDeletedHardEventDataType;
