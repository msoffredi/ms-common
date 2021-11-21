import { EventSources } from '..';
import { events } from './types';

export enum Types {
    UserDeleted = 'user.deleted',
    UserCreated = 'user.created',
}

export interface UserDeletedEventDataType {
    type: Types.UserDeleted;
    data: {
        userId: string;
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
