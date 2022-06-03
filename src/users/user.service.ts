import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.user.dto';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UserService {

	constructor(
		@Inject('USERS_REPOSITORY')
		private usersRepository: typeof User
	) {}

	async findAll(): Promise<User[]> {
		return await this.usersRepository.findAll<User>();
	}

	async findOne(id: string): Promise<User> {
		return await this.usersRepository.findByPk<User>(id);
	}

	// async create(user: User): Promise<User> {
	// 	return this.usersRepository.create<User>(user);
	// }

	async register(registerUserDto: RegisterUserDto): Promise<User> {
		try {
				const user = new User();
				user.email = registerUserDto.email.trim().toLowerCase();
				user.name = registerUserDto.name;

				const salt = await genSalt(10);
				user.password = await hash(registerUserDto.password, salt);
				console.log(registerUserDto);
				console.log('.------------------');
				console.log(user);
				
				
				return await user.save();
				
				// when registering then log user in automatically by returning a token
				// const token = await this.signToken(userData);
				// return new UserLoginResponseDto(userData, token);
		} catch (err) {
				console.log(err);
			
				if (err?.original?.constraint === 'user_email_key') {
						throw new HttpException(
								`User with email '${err.errors[0].value}' already exists`,
								HttpStatus.CONFLICT,
						);
				}

				throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
		}
}

	async update(id: string, newUser: RegisterUserDto): Promise<User> {
		// await this.usersRepository.create<User>(newUser, {
		// 	where: {
		// 		id: id
		// 	}	
		// });
		const user = await this.findOne(id);
		return user;
	}

	async delete(id: string): Promise<User> {
		const user = await this.findOne(id);
		// this.usersRepository.create({
		// 	where: {
		// 		id
		// 	}
		// });
		return user;
	}

	async findByEmail(email: string): Promise<User> {
		return await this.usersRepository.findOne<User>({
			where: {
				email: email
			}
		});
	}

	async findByEmailAndPassword(email: string, password: string): Promise<User> {
		return await this.usersRepository.findOne<User>({
			where: {
				email: email,
				password: password
			}
		});
	}

}
