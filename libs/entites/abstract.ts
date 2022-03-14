import { Exclude } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Primary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Exclude()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at?: Date;
}

export abstract class UpdateColumn {
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at?: Date;
}

export abstract class UnPrimary {
  @CreateDateColumn({
    name: 'created_at',
  })
  created_at?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at?: Date;
}
