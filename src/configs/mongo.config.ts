import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

enum MongoEnv {
	MONGO_LOGIN = 'MONGO_LOGIN',
	MONGO_PASSWORD = 'MONGO_PASSWORD',
	MONGO_HOST = 'MONGO_HOST',
	MONGO_PORT = 'MONGO_PORT',
	MONGO_AUTHDATABASE = 'MONGO_AUTHDATABASE'
}

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return Promise.resolve({
		uri: getMongoConnectString(configService),
		...getMongoOptions()
	});
};

const getMongoConnectString = (configService: ConfigService) => (
	'mongodb://' +
	configService.get(MongoEnv.MONGO_LOGIN) +
	':' +
	configService.get(MongoEnv.MONGO_PASSWORD) +
	'@' +
	configService.get(MongoEnv.MONGO_HOST) +
	':' +
	configService.get(MongoEnv.MONGO_PORT) +
	'/' +
	configService.get(MongoEnv.MONGO_AUTHDATABASE)
);

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});