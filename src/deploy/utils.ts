import AWS, { AWSError } from 'aws-sdk';
import {
    CustomEmailLambdaVersionConfigType,
    CustomSMSLambdaVersionConfigType,
    DescribeUserPoolResponse,
    LambdaConfigType,
    ListUserPoolsResponse,
    UserPoolIdType,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import {
    FunctionConfiguration,
    ListFunctionsResponse,
} from 'aws-sdk/clients/lambda';

export const setCognitoTrigger = (
    userPoolName: string,
    trigger: keyof LambdaConfigType,
    lambdaArn: string,
) => {
    const cognitoISP = new AWS.CognitoIdentityServiceProvider();

    getUserPoolId(userPoolName, cognitoISP, (UserPoolId: UserPoolIdType) => {
        cognitoISP.describeUserPool(
            {
                UserPoolId,
            },
            (err: AWSError, data: DescribeUserPoolResponse) => {
                if (err) {
                    throw err;
                }

                // console.log(data);
                const userPool = data.UserPool;

                if (
                    userPool &&
                    userPool.LambdaConfig &&
                    !userPool.LambdaConfig[trigger]
                ) {
                    userPool.LambdaConfig[trigger] = lambdaArn as string &
                        CustomSMSLambdaVersionConfigType &
                        CustomEmailLambdaVersionConfigType;

                    cognitoISP.updateUserPool(
                        {
                            UserPoolId,
                            LambdaConfig: userPool.LambdaConfig,
                        },
                        (err, data) => {
                            if (err) {
                                throw err;
                            }
                            console.log(
                                `${trigger} trigger successfully set in ${userPoolName} user pool`,
                            );
                        },
                    );
                } else {
                    console.error(
                        `Operation aborted: ${trigger} trigger in ${userPoolName} user pool already defined`,
                    );
                }
            },
        );
    });
};

export const getUserPoolId = (
    userPoolName: string,
    cognitoISP: AWS.CognitoIdentityServiceProvider,
    callback: (userPoolId: string) => void,
) => {
    // Get all Cognito User Pools
    cognitoISP.listUserPools(
        {
            MaxResults: 60,
        },
        (err: AWSError, data: ListUserPoolsResponse) => {
            if (err) {
                throw err;
            }

            // Filter out User Pools of interest
            const allUserPools = data.UserPools ?? [];
            const userPools = allUserPools.filter((pool) => {
                if (pool.Name && pool.Name === userPoolName) {
                    return true;
                }
                return false;
            });

            if (userPools.length === 1) {
                if (userPools[0].Id) {
                    callback(userPools[0].Id);
                } else {
                    throw new Error('User pool id is missing or empty');
                }
            } else {
                throw new Error(
                    'More than one user pool matching the criteria. Aborting',
                );
            }
        },
    );
};

export const getLambdaArn = async (lambdaName: string) => {
    const lambda = new AWS.Lambda();
    let lambdas: FunctionConfiguration[] = [];
    let end = false;
    let next = false;
    let nextMarker;

    while (!end) {
        lambda.listFunctions(
            {
                Marker: nextMarker,
                FunctionVersion: 'ALL',
                MaxItems: 5,
            },
            (err: AWSError, data: ListFunctionsResponse) => {
                if (err) {
                    throw err;
                }

                if (data.Functions && data.Functions.length) {
                    lambdas = [...lambdas, ...data.Functions];
                }

                if (data.NextMarker === null) {
                    end = true;
                } else {
                    nextMarker = data.NextMarker;
                }

                next = true;
            },
        );

        while (!next) {
            await sleep(10);
        }

        next = false;
    }

    const filteredLambdas = lambdas.filter((item: FunctionConfiguration) => {
        if (item.FunctionName && item.FunctionName.indexOf(lambdaName) >= 0) {
            return true;
        }

        return false;
    });

    if (filteredLambdas.length !== 1) {
        throw new Error('More than one lambda matching the name');
    }

    if (!filteredLambdas[0].FunctionArn) {
        throw new Error('Lambda function Arn missing or empty');
    }

    return filteredLambdas[0].FunctionArn.replace(':$LATEST', '');
};

/**
 * This is a simulated sleep() function and you should use it like this:
 *
 * await sleep(milliseconds);
 *
 * Where milliseconds is the number of milliseconds you want to pause for.
 *
 * @param ms Milliseconds to pause operation
 * @returns
 */
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
