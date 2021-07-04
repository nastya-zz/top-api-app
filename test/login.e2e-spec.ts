import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';
import * as request from 'supertest';
import { disconnect } from 'mongoose';

const loginDto: AuthDto = {
	login: 'test@email.ru',
	password: '123456'
};

describe('AppController (e2e)', () => {
	let app: INestApplication;


	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) --success', async (done) => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
				done();
			});
	});

	it('/auth/login (POST) --fail email', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ login: 'a@a.ru', password: '123456' })
			.expect(401, {
				'statusCode': 401,
				'message': 'Такой пользователь не найден!',
				'error': 'Unauthorized'
			});
	});

	it('/auth/login (POST) --fail password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '1' })
			.expect(401, {
				'statusCode': 401,
				'message': 'Не верный пароль!',
				'error': 'Unauthorized'
			});
	});


	afterAll(() => {
		disconnect();
	});
});