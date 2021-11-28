import { DeepPartial } from 'dynamoose/dist/General';
import { ModelOptions } from 'dynamoose/dist/Model';

const modelOptions: DeepPartial<ModelOptions> = {
    create: false,
    waitForActive: false,
};

if (process.env.AWS_SAM_LOCAL) {
    modelOptions.create = true;
}

enum Serializers {
    RemoveTimestamps = 'removeTimeStamps',
}

const SerializersOptions = {
    [Serializers.RemoveTimestamps]: { exclude: ['createdAt', 'updatedAt'] },
};

export { modelOptions, Serializers, SerializersOptions };
