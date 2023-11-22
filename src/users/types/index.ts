import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      userId: 1,
      username: 'Ivan',
      password: '123456',
    },
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'Session has ended' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({ example: 'ivan@test.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({
    example: '$2b$10$Gb7nAGxGCOXq0gQPAs0niu3FaelvnG5rXMPjnR0.uT0hoO9co9Ki2',
  })
  password: string;

  @ApiProperty({ example: 'ivan@test.com' })
  email: string;

  @ApiProperty({ example: '2023-11-22T20:38:05.181Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-11-22T20:38:05.181Z' })
  createdAt: string;
}
