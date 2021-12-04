import { EventBridge } from 'aws-sdk';
import { BaseEventDataType } from './event-data-types';

export const awsEventbridgePublisher = async (
    data: BaseEventDataType,
    detailType: string,
    busName: string,
    source: string,
): Promise<void> => {
    const eventbridge = new EventBridge();

    const params = {
        Entries: [
            {
                EventBusName: busName,
                Detail: JSON.stringify(data),
                DetailType: detailType,
                Source: source,
                Time: new Date(),
            },
        ],
    };

    // @todo We need to validate the event was published or save it to publish it later
    const response = await eventbridge.putEvents(params).promise();
    console.log('Event publish response:', response);
};
