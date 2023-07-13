import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { comparePassword, hashPassword } from '../common/bcrypt';
import { CreateUserDto } from './interfaces/createUser.interface';
import { LoginUserDto } from './interfaces/loginUser.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    try {
      if (createUser.password !== createUser.confirmPassword) {
        throw 'Password does not match with Confirm Password';
      }
      const pass = await hashPassword(createUser.password);
      const newUser = await this.usersRepository.save({
        name: createUser.name,
        email: createUser.email,
        password: pass,
      });
      if (!newUser) {
        throw 'Failed to register the user';
      }
      return newUser;
    } catch (error: any) {
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginUser: LoginUserDto) {
    try {
      const findUser: User = await this.usersRepository.findOneBy({
        email: loginUser.email,
      });
      if (!findUser) {
        throw 'No user found with this email';
      }
      const compare = await comparePassword(
        loginUser.password,
        findUser.password,
      );
      if (!compare) {
        throw 'Invalid password';
      }
      return findUser;
    } catch (error: any) {
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const findUsers: User[] = await this.usersRepository.find();
      if (!findUsers.length) {
        throw 'No users found';
      }
      return findUsers;
    } catch (error: any) {
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      return this.usersRepository.findOneBy({ id });
    } catch (error: any) {
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<number> {
    try {
      const deleteUser = await this.usersRepository.delete(id);
      if (!deleteUser.affected) {
        throw 'User was unable to delete';
      }
      return 1;
    } catch (error: any) {
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
