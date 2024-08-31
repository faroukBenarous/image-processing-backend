import { IsNotEmpty } from 'class-validator';

export class EnvVariables {
  @IsNotEmpty()
  PROVIDER: string;

  @IsNotEmpty()
  HTTP_PORT: string;

  @IsNotEmpty()
  AWS_ACCESS_KEY_ID: string

  @IsNotEmpty()
  AWS_SECRET_ACCESS_KEY: string

  @IsNotEmpty()
  AWS_REGION: string
}
