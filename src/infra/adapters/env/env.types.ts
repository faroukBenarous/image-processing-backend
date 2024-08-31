import { IsNotEmpty } from 'class-validator';

export class EnvVariables {
  @IsNotEmpty()
  PROVIDER: string;

  @IsNotEmpty()
  HTTP_PORT: string;
}
