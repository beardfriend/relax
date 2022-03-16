import { Exclude, Expose } from 'class-transformer';

export class PrimaryDto {
  @Exclude()
  id: number;

  @Exclude()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}

export class UpdateDto {
  @Expose()
  updatedAt?: Date;
}

export class UnPrimaryDto {
  @Exclude()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
