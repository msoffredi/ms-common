export enum Types {
    UserDeleted = 'user.deleted',
    UserDeletedHard = 'user.deleted.hard',
    UserCreated = 'user.created',
}

export interface BaseEventDataType {
    type: string;
    data: {
        [key: string]: unknown;
    };
}

export interface UserDeletedEventDataType extends BaseEventDataType {
    type: Types.UserDeleted;
    data: {
        id: string;
        email: string;
    };
}

export interface UserDeletedHardEventDataType extends BaseEventDataType {
    type: Types.UserDeletedHard;
    data: {
        id: string;
        email: string;
    };
}

export interface UserCreatedEventDataType extends BaseEventDataType {
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
