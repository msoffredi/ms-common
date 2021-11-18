import { awsEventbridgePublisher } from './aws-eventbridge-publisher';
import { EventBusTypes } from './types';

export interface EventData {
    [key: string]: unknown;
}

export const publisher = async (
    type: string,
    data: EventData,
    detailType: string,
    eventBusType: EventBusTypes,
    busName: string,
    source: string,
): Promise<void> => {
    if (eventBusType === EventBusTypes.AWSEventBridge) {
        await awsEventbridgePublisher(type, data, detailType, busName, source);
    }
};
