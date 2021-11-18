import { EventBridgeEvent } from 'aws-lambda';

export enum EventBusTypes {
    AWSEventBridge = 'aws-event-bridge',
}

export type EventHandler<T extends string, D> = (
    event: EventBridgeEvent<T, D>,
) => Promise<string>;
