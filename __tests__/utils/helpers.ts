import { APIGatewayProxyEvent } from 'aws-lambda';

export function constructAPIGwEvent(
    message: unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Record<string, any> = {},
): APIGatewayProxyEvent {
    return {
        httpMethod: options.method || 'GET',
        path: options.path || '/',
        queryStringParameters: options.query || {},
        headers: options.headers || {},
        body: options.rawBody || JSON.stringify(message),
        multiValueHeaders: {},
        multiValueQueryStringParameters: {},
        isBase64Encoded: false,
        pathParameters: options.pathParameters || {},
        stageVariables: options.stageVariables || {},
        requestContext: options.requestContext || {},
        resource: options.resource || '',
    };
}
