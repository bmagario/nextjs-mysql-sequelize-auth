import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
	@ApiProperty()
  name: string;

  @Column
	@ApiProperty()
  email: string;
	
  @Column
	@ApiProperty()
  password: string;
}