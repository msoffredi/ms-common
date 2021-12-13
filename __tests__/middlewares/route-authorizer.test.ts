import jwt from 'jsonwebtoken';
import { routeAuthorizer } from '../../src/middlewares/route-authorizer';
import { constructAPIGwEvent } from '../utils/helpers';

const callback = jest.fn();
const validPermission = {
    moduleId: 'test-module',
    operationId: 'read',
};
const invalidPermission = {
    moduleId: 'test-module-invalid',
    operationId: 'read',
};

const testUser = {
    id: 'user123',
    email: 'test@test.com',
};

it('authorizes a user with a double star permission', async () => {
    const token = jwt.sign(
        {
            email: testUser.email,
            userPermissions: JSON.stringify([['*', '*']]),
        },
        'test',
    );
    const event = constructAPIGwEvent({});
    event.headers = {
        ...event.headers,
        Authorization: `Bearer ${token}`,
    };

    await routeAuthorizer(event, callback, [validPermission], false);
    expect(callback).toHaveBeenCalled();
});

it('authorizes a user with precise permission', async () => {
    const { moduleId, operationId } = validPermission;
    const token = jwt.sign(
        {
            email: testUser.email,
            userPermissions: JSON.stringify([[moduleId, operationId]]),
        },
        'test',
    );
    const event = constructAPIGwEvent({});
    event.headers = {
        ...event.headers,
        Authorization: `Bearer ${token}`,
    };

    await routeAuthorizer(event, callback, [{ moduleId, operationId }], false);
    expect(callback).toHaveBeenCalled();
});

it('does not authorize a user with wrong permission', async () => {
    const { moduleId, operationId } = validPermission;
    const token = jwt.sign(
        {
            email: testUser.email,
            userPermissions: JSON.stringify([[moduleId, operationId]]),
        },
        'test',
    );
    const event = constructAPIGwEvent({});
    event.headers = {
        ...event.headers,
        Authorization: `Bearer ${token}`,
    };

    try {
        await routeAuthorizer(event, callback, [invalidPermission], false);

        fail('routeAuthorizer must throw an error');
    } catch (err) {
        expect(callback).not.toHaveBeenCalled();
    }
});

it('authorizes a user with insufficient permission but self request in enabled', async () => {
    const token = jwt.sign(
        {
            email: testUser.email,
            userPermissions: JSON.stringify([
                ['wrong-module', 'wrong-operation'],
            ]),
            'custom:userId': testUser.id,
        },
        'test',
    );
    const event = constructAPIGwEvent(
        {},
        {
            pathParameters: { id: testUser.id },
        },
    );
    event.headers = {
        ...event.headers,
        Authorization: `Bearer ${token}`,
    };

    await routeAuthorizer(event, callback, [validPermission], true);
    expect(callback).toHaveBeenCalled();
});
