import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.user.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.findAll();
	}

	@Get()
	@ApiParam({ name: 'id' })
	async findOne(@Param() params): Promise<User> {
		return await this.userService.findOne(params.id);
	}

	@Post('register')
	@ApiBody({ type: RegisterUserDto })
	async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
		return this.userService.register(registerUserDto);
	}

	@Put()
	@ApiParam({ name: 'id' })
	async update(@Param() params, @Body() user: RegisterUserDto): Promise<User> {
		return await this.userService.update(params.id, user);
	}

	@Put()
	@ApiParam({ name: 'id' })
	async delete(@Param() params): Promise<User> {
		return await this.userService.delete(params.id);
	}
}
