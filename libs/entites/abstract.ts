import { PrimaryDto } from '@Libs/dto/abstract';
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

export abstract class PrimaryTest<T> extends PrimaryDto {
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

  constructor(data: Partial<T>) {
    super();
    Object.assign(this, data);
  }
}

export abstract class UpdateColumn {
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
