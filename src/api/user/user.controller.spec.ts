import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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

  describe('root', () => {
    it('should be defined', async () => {
      // expect(userController).toBeDefined();
      const user = await userController.getUser(1);
      console.log(user);
      expect(user).toBeInstanceOf(User);
      // console.log(userController.getUser(1))
    });
    // it('should return user with id', async () => {
    // });
  });
});
