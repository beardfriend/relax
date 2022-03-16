import { PrimaryDto, UpdateDto } from '@Libs/dto/abstract';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Primary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}

export abstract class PrimaryTest extends PrimaryDto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}

export abstract class UpdateColumn extends UpdateDto {
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}

export abstract class UpdateColumnTest extends UpdateDto {
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}

export abstract class UnPrimary {
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}
