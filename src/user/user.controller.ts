import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './interfaces/createUser.interface';
import { LoginUserDto } from './interfaces/loginUser.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Post('/login')
  async login(@Body() data: LoginUserDto) {
    return this.userService.login(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
