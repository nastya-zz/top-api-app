import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

enum MongoEnv {
    MONGO_LOGIN ='MONGO_LOGIN',
    MONGO_PASSWORD = 'MONGO_PASSWORD',
    MONGO_HOST = 'MONGO_HOST',
    MONGO_PORT = 'MONGO_PORT',
    MONGO_AUTHDATABASE = 'MONGO_AUTHDATABASE'
}

export const getMongoConfig = async(configServise: ConfigService): Promise<TypegooseModuleOptions> => {
 return Promise.resolve({
     uri: getMongoConnectString(configServise),
     ...getMongoOptions()
 })
};

const getMongoConnectString = (configServise: ConfigService) => (
    'mondodb://' + 
    configServise.get(MongoEnv.MONGO_LOGIN) + 
    ':' +
    configServise.get(MongoEnv.MONGO_PASSWORD) +
    '@' + 
    configServise.get(MongoEnv.MONGO_HOST) +
    ':' +
    configServise.get(MongoEnv.MONGO_PORT) +
    '/' + 
    configServise.get(MongoEnv.MONGO_AUTHDATABASE) 
);

const getMongoOptions = () => ({
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});