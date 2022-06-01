export interface LoginDto {
  readonly email: string;

  readonly password: string;
}

export interface RegistrationDto extends LoginDto {
  readonly firstName: string;

  readonly lastName: string;
}
