import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'ivan@test.com' })
  @IsNotEmpty()
  readonly email: string;
}
