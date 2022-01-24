import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Primary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at?: Date;

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
