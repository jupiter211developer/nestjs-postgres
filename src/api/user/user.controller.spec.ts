import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

let app: TestingModule = null
let userController: UserController;

beforeAll(async () => {
  app = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'nest_api',
        username: 'postgres',
        password: 'ROOT',
        entities: [User],
        migrations: ['../../../dist/migrations/*.{ts,js}'],
        migrationsTableName: 'typeorm_migrations',
        logger: 'file',
      }),
      TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService],
  }).compile();

  userController = app.get<UserController>(UserController);
});
afterAll(async () => {
  await app.close();
})
describe('UserController', () => {
  describe('root', () => {
    it('should be defined', async () => {
      expect(userController).toBeDefined();
      // console.log(userController.getUser(1))
    });
    it(`should return user with ${1}`, async () => {
      const user = await userController.getUser(1);
      expect(user).toBeInstanceOf(User);
    });
    it(`should return user with ${2}`, async () => {
      const user = await userController.getUser(2);
      expect(user).toBeUndefined();
    });
  });
});
