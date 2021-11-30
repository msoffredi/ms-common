import { APIGatewayProxyEvent } from 'aws-lambda';
import { Document } from 'dynamoose/dist/Document';
import { ObjectType } from 'dynamoose/dist/General';
import { ErrorEntry } from './errors/types';

interface ErrorResponseBody {
    message: string;
}

export enum ServiceStatus {
    Healthy = 'healthy',
}

export interface HealthcheckResponseBody {
    serviceStatus: ServiceStatus;
}

export interface DeleteRecordResponseBody {
    deleted: string;
}

export interface PaginatedCollection {
    lastKey?: string;
    count: number;
    data: ObjectType[];
}

export type ResponseBody =
    | Document
    | ObjectType[]
    | ErrorResponseBody
    | HealthcheckResponseBody
    | DeleteRecordResponseBody
    | ErrorEntry[]
    | PaginatedCollection
    | null;

export type RouteHandler = (
    event: APIGatewayProxyEvent,
) => Promise<ResponseBody>;

export interface RouteHandlerResponse {
    status: number;
    body: Record<string, unknown> | unknown[];
}
