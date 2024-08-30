import { IsNotEmpty } from 'class-validator';

export class EnvVariables {
  @IsNotEmpty()
  ENVIRONMENT: string;

  @IsNotEmpty()
  HTTP_PORT: string
}
