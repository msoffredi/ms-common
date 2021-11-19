import { EventBridgeEvent } from 'aws-lambda';

export enum EventBusTypes {
    AWSEventBridge = 'aws-event-bridge',
}

interface EventBus {
    busName: string;
}

export const eventBuses: { [eventBus: string]: EventBus } = {
    [EventBusTypes.AWSEventBridge]: {
        busName: 'default',
    },
};

export type EventHandler<T extends string, D> = (
    event: EventBridgeEvent<T, D>,
) => Promise<string>;

export enum EventSources {
    Authorization = 'authorization-service',
    Users = 'user-service',
}

interface Event {
    source: EventSources;
    type: string;
}

interface EventsType {
    UserDeleted: Event;
}

export const events: EventsType = {
    UserDeleted: {
        source: EventSources.Users,
        type: 'user.deleted',
    },
};
