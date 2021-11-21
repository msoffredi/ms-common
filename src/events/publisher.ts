import { EventDataType } from '..';
import { awsEventbridgePublisher } from './aws-eventbridge-publisher';
import { EventBusTypes } from './types';

export const publisher = async (
    data: EventDataType,
    detailType: string,
    eventBusType: EventBusTypes,
    busName: string,
    source: string,
): Promise<void> => {
    if (eventBusType === EventBusTypes.AWSEventBridge) {
        await awsEventbridgePublisher(data, detailType, busName, source);
    }
};
