import { User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly name: string;

    constructor(user: User) {
			this.id = user.id;
			this.email = user.email;
			this.name = user.name;
    }
}